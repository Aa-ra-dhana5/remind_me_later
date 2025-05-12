import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Schedule from "../pages/Schedule";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
