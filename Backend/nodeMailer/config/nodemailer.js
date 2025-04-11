const nodemailer = require("nodemailer");
const { verificationPinEmailTemplate } = require("../Templates/verificationPinEmailTemplate");


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.User_PASS,
  },
});

const sendVerificationEmail = async (email, verificationPin) => {
  const subject = "Verify Your Email";
  const html = verificationPinEmailTemplate(verificationPin);
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

module.exports = sendVerificationEmail; // ✅ Exporting function directly
