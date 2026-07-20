const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_app_password_here') {
    console.log('[Nodemailer Notice] SMTP credentials not set in .env. Skipping email sending, message recorded in MongoDB.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: options.to || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `[Portfolio Contact] ${options.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #050814; color: #e2e8f0; padding: 20px; border-radius: 8px;">
          <h2 style="color: #00d4ff; border-bottom: 2px solid #a855f7; padding-bottom: 8px;">New Contact Inquiry Received</h2>
          <p><strong>Name:</strong> ${options.name}</p>
          <p><strong>Email:</strong> ${options.email}</p>
          <p><strong>Subject:</strong> ${options.subject}</p>
          <hr style="border: 1px solid #1e293b; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #0a0e27; padding: 15px; border-radius: 6px; border-left: 4px solid #00d4ff;">${options.message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] Email notification successfully dispatched.');
    return true;
  } catch (error) {
    console.error('[Nodemailer Error] Email dispatch failed:', error.message);
    return false;
  }
};

module.exports = sendEmail;
