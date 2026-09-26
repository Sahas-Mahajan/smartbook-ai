const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: `"SmartBook" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "SmartBook - Verify Your Email",
    text: `Your SmartBook verification code is: ${verificationCode}

This code will expire in 10 minutes.

If you did not create a SmartBook account, you can ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (
  email,
  resetCode
) => {
  const mailOptions = {
    from: `"SmartBook" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "SmartBook - Password Reset Code",
    text: `Your SmartBook password reset code is: ${resetCode}

This code will expire in 10 minutes.

If you did not request a password reset, you can ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};