const axios = require("axios");
require("dotenv").config();

async function sendSMS(phone, message) {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "v3",
        sender_id: "FSTSMS", // use your approved sender ID if you have one
        message: message,
        language: "english",
        flash: 0,
        numbers: phone, // send as string, e.g., "9876543210"
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY, // loaded from .env
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.return === true) {
      console.log("SMS sent successfully:", response.data);
      return true;
    } else {
      console.error("Fast2SMS error response:", response.data);
      throw new Error(response.data.message || "Failed to send SMS");
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("Fast2SMS response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from Fast2SMS:", error.request);
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
}

module.exports = sendSMS;
