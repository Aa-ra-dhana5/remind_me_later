import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const scheduleReminder = async (reminderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reminders`,
      reminderData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
