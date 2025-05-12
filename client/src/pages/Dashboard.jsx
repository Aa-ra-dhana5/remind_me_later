import React, { useEffect, useState } from "react";

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reminders from the backend API
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/reminders/reminders"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reminders.");
        }

        const data = await response.json();

        // Check if there are reminders
        if (data.reminders) {
          setReminders(data.reminders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return (
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Reminders</h2>
        <p className="text-gray-700">Loading reminders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Reminders</h2>
        <p className="text-gray-700">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Reminders</h2>

      {reminders.length === 0 ? (
        <p className="text-gray-700">You have no reminders scheduled.</p>
      ) : (
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Message</th>
                <th className="px-4 py-2 border-b">Date & Time</th>
                <th className="px-4 py-2 border-b">Method</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder._id}>
                  <td className="px-4 py-2 border-b">{reminder.message}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(reminder.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">{reminder.type}</td>
                  <td className="px-4 py-2 border-b">
                    {reminder.isSent ? (
                      <span className="text-green-600">Sent</span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Dashboard;