// models/Reminder.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, required: true },
  type: {
    type: String,
    enum: ["email", "sms", "both"],
    required: true,
  },
  email: { type: String },
  phone: { type: String },
  isSent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Reminder", reminderSchema);
