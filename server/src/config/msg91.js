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

    const resData = response.data;

    // 🚨 ADD THIS LINE:
    console.log("🔍 Full MSG91 Response:", JSON.stringify(resData, null, 2));

    // 🚨 TEMP: Always log full JSON instead of statusMsg
    console.log(`✅ SMS sent to ${to}:`, JSON.stringify(resData, null, 2));

    return { success: true, data: resData };
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error";

    console.error(`❌ Error sending SMS to ${to}: ${errorMsg}`);
    return { success: false, error: errorMsg };
  }
};

module.exports = sendSMS;
