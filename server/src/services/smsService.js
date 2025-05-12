const axios = require("axios");

const sendSMS = async (to, message) => {
  const url = `https://api.msg91.com/api/sendhttp.php?mobiles=${to}&authkey=${
    process.env.MSG91_AUTH_KEY
  }&route=4&sender=${process.env.SENDER_ID}&message=${encodeURIComponent(
    message
  )}&country=91`;

  await axios.get(url);
};

module.exports = sendSMS;
