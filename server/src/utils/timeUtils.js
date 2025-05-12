// utils/timeUtils.js

const isPastOrNow = (dateString) => {
  return new Date(dateString) <= new Date();
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", // Change based on region
    hour12: true,
  });
};

module.exports = {
  isPastOrNow,
  formatDateTime,
};
