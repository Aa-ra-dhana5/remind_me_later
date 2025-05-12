import React from "react";

function Home() {
  return (
    <section className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Remind Me Later</h2>
      <p className="text-gray-700 mb-6">
        Set up reminders via SMS or Email easily.
      </p>
      <a
        href="/schedule"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Schedule a Reminder
      </a>
    </section>
  );
}

export default Home;
