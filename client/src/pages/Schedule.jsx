import React, { useState } from "react";

function Schedule() {
  const [formData, setFormData] = useState({
    message: "",
    date: "",
    time: "",
    method: "email",
    recipient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "method") {
      setFormData((prev) => ({
        ...prev,
        method: value,
        recipient: "", // reset recipient on method change
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { message, date, time, method, recipient } = formData;
    const datetime = new Date(`${date}T${time}:00`);

    // Validation checks
    if (!message || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    if (datetime <= new Date()) {
      alert("Please select a future date and time.");
      return;
    }

    if (method === "email" && !/\S+@\S+\.\S+/.test(recipient)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (method === "sms" && !/^\d{10}$/.test(recipient)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/reminders/reminders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            date: datetime.toISOString(),
            type: method,
            email: method === "email" ? recipient : undefined,
            phone: method === "sms" ? recipient : undefined,
          }),
        }
      );

      // Log the full response to inspect the data structure
      const data = await response.json();
      console.log("Response Data:", data); // Log the entire response to help debug

      // Handle the response based on status
      if (!response.ok) {
        // If the response is not ok, display error from the backend
        alert("Error: " + (data.message || "Unknown error"));
      } else if (data.success) {
        alert(`Reminder scheduled via ${method.toUpperCase()}`);
        setFormData({
          message: "",
          date: "",
          time: "",
          method: "email",
          recipient: "",
        });
      } else {
        // In case of any other failure
        alert(
          "Failed to schedule reminder: " + (data.message || "Unknown error")
        );
      }
    } catch (error) {
      // Catching errors in the try block (network issues, etc.)
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <section className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule a Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Method Selection */}
        <div>
          <label className="block mb-1 font-medium">Method</label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>

        {/* Recipient Input */}
        <div>
          <label className="block mb-1 font-medium">
            {formData.method === "email" ? "Email Address" : "Phone Number"}
          </label>
          <input
            type={formData.method === "email" ? "email" : "tel"}
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder={
              formData.method === "email"
                ? "example@email.com"
                : "10-digit mobile number"
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Schedule
        </button>
      </form>
    </section>
  );
}

export default Schedule;
