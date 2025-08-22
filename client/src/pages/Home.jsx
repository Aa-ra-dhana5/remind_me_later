import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-indigo-200 to-cyan-200 px-6 text-gray-900 overflow-hidden select-none">
      
      {/* Floating shapes in background */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-indigo-400 rounded-full opacity-20 filter blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-16 w-32 h-32 bg-pink-400 rounded-full opacity-25 filter blur-2xl"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-400 rounded-full opacity-15 filter blur-xl"
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero SVG with gentle rotation */}
      <motion.svg
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-32 h-32 mb-10 text-indigo-700 drop-shadow-lg"
        viewBox="0 0 24 24"
      >
        <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </motion.svg>

      {/* Heading */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-center tracking-tight"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Remind Me Later
      </motion.h1>

      {/* Animated underline */}
      <motion.div
        className="h-1 bg-indigo-700 rounded-full w-36 mx-auto mb-10 shadow-md"
        initial={{ width: 0 }}
        animate={{ width: "9rem" }}
        transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
      />

      {/* Subtext */}
      <motion.p
        className="max-w-lg text-center text-lg mb-12 px-4 leading-relaxed text-indigo-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Effortlessly schedule reminders via Email or SMS — and never miss an important moment again.
      </motion.p>

      {/* Call to Action */}
      <motion.a
        href="/schedule"
        className="inline-block px-10 py-3 bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-500 rounded-full text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-110"
        whileTap={{ scale: 0.95 }}
      >
        Schedule a Reminder
      </motion.a>
    </section>
  );
}
