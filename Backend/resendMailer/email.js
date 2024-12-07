require('dotenv').config();
const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });

  const mailOptions = {
    from: 'bhaianam9@gmail.com',
    to: email,
    subject: "Verify Your Email",
    html: `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="http://yourapp.com/verify-email?token=${verificationToken}">Verify Email</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
















