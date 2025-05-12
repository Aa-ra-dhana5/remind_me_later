// config/msg91.js
const axios = require("axios");

const sendSMS = async (to, message) => {
  const url = "https://control.msg91.com/api/v5/message/send";

  try {
    const response = await axios.post(
      url,
      {
        sender: process.env.SENDER_ID,
        route: process.env.ROUTE,
        country: "91",
        sms: [
          {
            message,
            to: [to],
          },
        ],
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS sent:", response.data);
    return { success: true };
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
    return { success: false, error };
  }
};

module.exports = sendSMS;
