// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Use app-specific password if 2FA is enabled
//   },
// });

// // Function to send email
// const sendEmail = async ({ to, subject = "Reminder Notification", text }) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendEmail };
