const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

let memoryMessages = [];

// @desc    Submit a contact form message
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message body are required fields.' });
    }

    let savedMessage;
    try {
      savedMessage = await Message.create({
        name,
        email,
        subject: subject || 'Portfolio Contact Inquiry',
        message,
      });
    } catch (dbErr) {
      savedMessage = {
        _id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || 'Portfolio Contact Inquiry',
        message,
        read: false,
        createdAt: new Date().toISOString(),
      };
      memoryMessages.unshift(savedMessage);
    }

    // Trigger Nodemailer background notification
    sendEmail({
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      message,
    }).catch(err => console.error('[Message Dispatch Warning]', err.message));

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. Anuj will get back to you shortly.',
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
  try {
    let messages = [];
    try {
      messages = await Message.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      messages = memoryMessages;
    }
    res.json(messages.length ? messages : memoryMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read
// @route   PATCH /api/messages/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res) => {
  try {
    try {
      const msg = await Message.findById(req.params.id);
      if (msg) {
        msg.read = true;
        await msg.save();
        return res.json(msg);
      }
    } catch (dbErr) {
      // Continue
    }

    const memMsg = memoryMessages.find(m => m._id === req.params.id);
    if (memMsg) {
      memMsg.read = true;
      return res.json(memMsg);
    }

    res.status(404).json({ message: 'Message not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res) => {
  try {
    try {
      const msg = await Message.findById(req.params.id);
      if (msg) {
        await msg.deleteOne();
        memoryMessages = memoryMessages.filter(m => m._id !== req.params.id);
        return res.json({ message: 'Message deleted successfully' });
      }
    } catch (dbErr) {
      // Continue
    }

    const initLen = memoryMessages.length;
    memoryMessages = memoryMessages.filter(m => m._id !== req.params.id);
    if (memoryMessages.length < initLen) {
      return res.json({ message: 'Message deleted successfully' });
    }

    res.status(404).json({ message: 'Message not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
};
