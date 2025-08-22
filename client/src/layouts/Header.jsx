import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CalendarPlus, BarChart2, Bell } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", icon: <Home size={20} />, label: "Home" },
  { to: "/schedule", icon: <CalendarPlus size={20} />, label: "Schedule" },
  { to: "/dashboard", icon: <BarChart2 size={20} />, label: "Dashboard" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="relative bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white p-5 shadow-md overflow-hidden h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full relative">
        {/* Left: App name with glow pulse bell icon */}
        <h1 className="text-xl font-bold select-none z-20 flex items-center gap-2">
          <Bell size={22} className="text-yellow-300 animate-pulse" />
          Remind Me Later
        </h1>

        {/* Centered nav */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-6 z-10">
          {navLinks.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className="relative group flex items-center justify-center w-10 h-10 hover:w-28 transition-all duration-300 ease-in-out bg-white/20 rounded-full backdrop-blur-md border border-white/30 overflow-hidden"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 0 }}
                  className={`absolute text-white transition-opacity duration-200 ${
                    isActive ? "text-yellow-300" : "text-white"
                  }`}
                >
                  {icon}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        {/* Right spacer */}
        <div className="w-24"></div>
      </div>
    </header>
  );
}
