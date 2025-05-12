const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const reminderRoutes = require("./routes/reminderRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan"); // optional

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "Loaded EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Present" : "❌ Missing"
);

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // optional

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Remind Me Later API");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Error Handler
app.use(errorHandler);

// Scheduler
require("./jobs/reminderScheduler");

module.exports = app;
