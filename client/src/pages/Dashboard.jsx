import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const res = await fetch(`${apiUrl}/reminders/reminders`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch reminders");
        setReminders(data.reminders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  return (
    <section className="h-screen w-full bg-gradient-to-br from-pink-300 via-indigo-200 to-cyan-200 p-0 m-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-none px-10 py-8 text-gray-800"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center drop-shadow-sm select-none">
          📋 Your Scheduled Reminders
        </h2>

        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-white/70 animate-pulse rounded-lg w-full"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center bg-red-100 rounded-md py-2 px-4 font-medium shadow">
            {error}
          </p>
        )}

        {!loading && !error && reminders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-20"
          >
            <img
              src="https://illustrations.popsy.co/gray/reminder.svg"
              alt="No Reminders"
              className="mx-auto h-40 mb-4 opacity-70"
            />
            <p className="text-lg">You have no reminders yet.</p>
          </motion.div>
        )}

        {!loading && !error && reminders.length > 0 && (
          <div className="overflow-auto rounded-xl shadow-lg ring-1 ring-white/50 mt-8">
            <table className="min-w-full text-sm backdrop-blur bg-white/60">
              <thead className="bg-gradient-to-r from-fuchsia-500 to-yellow-400 text-white text-left">
                <tr>
                  <th className="px-6 py-4 font-semibold">Message</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Method</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <motion.tr
                    key={reminder._id}
                    className="border-b border-white/30 hover:bg-white/50 transition-all"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">{reminder.message}</td>
                    <td className="px-6 py-4">
                      {new Date(reminder.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 capitalize">{reminder.type}</td>
                    <td className="px-6 py-4">
                      {reminder.isSent ? (
                        <motion.span
                          className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 shadow-inner"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          Sent
                        </motion.span>
                      ) : (
                        <motion.span
                          className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          Pending
                        </motion.span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </section>
  );
}
