const Reminder = require("../models/Reminder");
const reminderSchema = require("../validations/reminderValidation");
const { sendEmail } = require("../config/nodemailer");
const sendSMS = require("../config/msg91");

// Create a new reminder
const createReminder = async (req, res) => {
  const { error, value } = reminderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { message, date, type, email, phone } = value;

  try {
    // Create a new reminder and save it to the database
    const reminder = new Reminder({
      message,
      date,
      type,
      email,
      phone,
      isSent: false,
    });

    await reminder.save();

    // Check if the reminder date is in the past
    if (new Date(date) <= new Date()) {
      // Send notifications immediately if the date is in the past
      if (type === "email" || type === "both") {
        await sendEmail({
          to: email,
          subject: "Reminder",
          text: message,
        });
      }

      if (type === "sms" || type === "both") {
        await sendSMS(phone, message);
      }

      // Mark the reminder as sent
      reminder.isSent = true;
      await reminder.save();
    }

    // Return the success response
    return res
      .status(201)
      .json({ success: true, message: "Reminder scheduled", reminder });
  } catch (err) {
    console.error("Reminder creation failed:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all reminders
const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ date: -1 });
    res.status(200).json({ reminders });
  } catch (err) {
    console.error("Failed to get reminders:", err);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

module.exports = {
  createReminder,
  getAllReminders,
};
