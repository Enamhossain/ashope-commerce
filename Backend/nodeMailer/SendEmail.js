const { default: transporter } = require("./config/nodemailer");
const { verificationPinEmailTemplate } = require("./Templates/verificationPinEmailTemplate");

const sendVerificationEmail = async (email, verificationPin) => {
  console.log(email,verificationPin)
  const subject = "Verify Your Email ";
  const html = verificationPinEmailTemplate(verificationPin);
  const mailOptions = {
    from: "squadparkclothing@gmail.com",  
    to: email, 
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", transporter);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Email sending failed");
  }
};

sendVerificationEmail;
