const express = require("express");
const router = express.Router();
const {
  createReminder,
  getAllReminders,
} = require("../controllers/reminderController");

router.post("/reminders", createReminder);
router.get("/reminders", getAllReminders);

module.exports = router;
