const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(sendMessage)
  .get(protect, getMessages);

router.route('/:id/read')
  .patch(protect, markAsRead);

router.route('/:id')
  .delete(protect, deleteMessage);

module.exports = router;
