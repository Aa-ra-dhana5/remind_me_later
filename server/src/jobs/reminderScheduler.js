const cron = require("node-cron");
const Reminder = require("../models/Reminder");
const { sendEmail } = require("../services/emailService");
const sendSMS = require("../services/smsService");

cron.schedule("* * * * *", async () => {
  console.log("⏰ Running reminder scheduler...");
  const now = new Date();

  try {
    // Fetch reminders that are not sent and are due
    const reminders = await Reminder.find({
      isSent: false,
      date: { $lte: now },
    });

    if (reminders.length === 0) {
      console.log("No reminders to send at this time.");
    }

    console.log(`Found ${reminders.length} reminder(s) to process.`);

    for (const reminder of reminders) {
      const { type, email, phone, message } = reminder;

      console.log(`Processing reminder for ${email || phone}`);

      try {
        // Send email if reminder type includes email
        if (type === "email" || type === "both") {
          console.log(`Sending email to: ${email}`);
          const emailResult = await sendEmail({
            to: email,
            subject: "Reminder",
            text: message,
          });
          console.log(`Email sent to ${email}: ${emailResult}`);
        }

        // Send SMS if reminder type includes SMS
        if (type === "sms" || type === "both") {
          console.log(`Sending SMS to: ${phone}`);
          const smsResult = await sendSMS(phone, message);
          console.log(`SMS sent to ${phone}: ${smsResult}`);
        }

        // Mark the reminder as sent
        reminder.isSent = true;
        await reminder.save();
        console.log(`Reminder marked as sent: ${reminder._id}`);
      } catch (error) {
        console.error(`Error sending reminder to ${email || phone}:`, error);
      }
    }
  } catch (error) {
    console.error("❌ Error processing reminders:", error.message);
    console.error("Error stack:", error.stack);
  }
});
