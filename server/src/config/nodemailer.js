require("dotenv").config(); // Ensure this is at the top

const nodemailer = require("nodemailer");

// Log email env values (without exposing password)
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER || "❌ Missing");
console.log(
  "🔒 EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"
);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',

  port: process.env.EMAIL_PORT || 465,
   secure: process.env.EMAIL_PORT === '465', // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, 
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error.message);
  } else {
    console.log("✅ SMTP server ready to send emails");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"Remind Me Later" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || "", // fallback if no HTML
      html: html || `<p>${text}</p>`, // fallback if no HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error };
  }
};

module.exports = { transporter, sendEmail };
