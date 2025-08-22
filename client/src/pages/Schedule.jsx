import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  Send,
  MessageCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Schedule() {
  const [formData, setFormData] = useState({
    message: "",
    date: "",
    time: "",
    method: "email",
    recipient: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "method") {
      setFormData((prev) => ({ ...prev, method: value, recipient: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [errorType, setErrorType] = useState(null); // null | "past" | "invalid" | "network"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrorType(null);

    const { message, date, time, method, recipient } = formData;
    const datetime = new Date(`${date}T${time}:00`);

    if (!message || !date || !time) {
      setStatus("error");
      setErrorType("invalid");
      return;
    }

    if (datetime <= new Date()) {
      setStatus("error");
      setErrorType("past");
      return;
    }

    if (method === "email" && !/\S+@\S+\.\S+/.test(recipient)) {
      setStatus("error");
      setErrorType("invalid");
      return;
    }

    if (method === "sms" && !/^\d{10}$/.test(recipient)) {
      setStatus("error");
      setErrorType("invalid");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/reminders/reminders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            date: datetime.toISOString(),
            type: method,
            email: method === "email" ? recipient : undefined,
            phone: method === "sms" ? recipient : undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorType("network");
      } else {
        setStatus("success");

        // Delay form reset until alert disappears
        setTimeout(() => {
          setFormData({
            message: "",
            date: "",
            time: "",
            method: "email",
            recipient: "",
          });
          setStatus(null);
          setErrorType(null);
        }, 2500); // Form reset and alert removal after delay
        return; // Exit to avoid the second setTimeout
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setErrorType("network");
    }

    setTimeout(() => {
      setStatus(null);
      setErrorType(null);
    }, 2500); // Shorter display
  };

  const AnimatedResult = () => {
    if (!status) return null;

    const getContent = () => {
      if (status === "success") {
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-full shadow-xl border-4 border-green-500"
          >
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="#28a745"
                strokeWidth="3"
                fill="#fff"
              />
              <polyline
                points="20 34 28 42 44 26"
                fill="none"
                stroke="#28a745"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        );
      }

      // Error animations
      if (errorType === "past") {
        return (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-full shadow-xl border-4 border-yellow-500"
          >
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="#fbbf24"
                strokeWidth="3"
                fill="#fff"
              />
              <line
                x1="32"
                y1="32"
                x2="20"
                y2="20"
                stroke="#fbbf24"
                strokeWidth="4"
              />
              <line
                x1="32"
                y1="32"
                x2="44"
                y2="24"
                stroke="#fbbf24"
                strokeWidth="4"
              />
            </svg>
          </motion.div>
        );
      }

      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-white p-6 rounded-full shadow-xl border-4 border-red-500"
        >
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="#dc3545"
              strokeWidth="3"
              fill="#fff"
            />
            <line
              x1="22"
              y1="22"
              x2="42"
              y2="42"
              stroke="#dc3545"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="42"
              y1="22"
              x2="22"
              y2="42"
              stroke="#dc3545"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      );
    };

    return (
      <AnimatePresence>
        <motion.div
          key="alert-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          {getContent()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-300 via-indigo-200 to-cyan-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-8 max-w-lg w-full text-gray-900 space-y-6 relative z-10"
      >
        <h2 className="text-3xl font-extrabold text-center drop-shadow-sm select-none">
          🔔 Schedule Your Reminder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Method Selector */}
          <div>
            <label className="block mb-1 text-sm font-semibold select-none">
              Method
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full bg-white/70 border border-white/80 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="email">Email 📧</option>
              <option value="sms">SMS 📱</option>
            </select>
          </div>

          {/* Recipient Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold select-none">
              {formData.method === "email" ? "Email Address" : "Phone Number"}
            </label>
            <div className="relative">
              {formData.method === "email" ? (
                <Mail
                  className="absolute left-3 top-3 text-gray-500"
                  size={20}
                />
              ) : (
                <Phone
                  className="absolute left-3 top-3 text-gray-500"
                  size={20}
                />
              )}
              <input
                type={formData.method === "email" ? "email" : "tel"}
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder={
                  formData.method === "email"
                    ? "example@email.com"
                    : "10-digit number"
                }
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-white/80 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-semibold select-none">
              Message
            </label>
            <div className="relative">
              <MessageCircle
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's the reminder?"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-white/80 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-sm font-semibold select-none">
              Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-white/80 text-gray-900 focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block mb-1 text-sm font-semibold select-none">
              Time
            </label>
            <div className="relative">
              <Clock
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-white/80 text-gray-900 focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-fuchsia-500 to-yellow-400 hover:from-fuchsia-600 hover:to-yellow-500 text-white font-bold py-2 rounded-lg transition-all duration-300 shadow-md hover:scale-105 select-none"
          >
            <Send size={18} /> Schedule Reminder
          </button>
        </form>
      </motion.div>

      <AnimatedResult />
    </section>
  );
}
