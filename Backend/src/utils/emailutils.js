// utils/emailUtils.js
import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, body, attachmentPath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
      attachments: [
        {
          path: attachmentPath, // Path to the PDF ticket
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
