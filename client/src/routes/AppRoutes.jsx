import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Reminder from "../pages/Reminder";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}

        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute> */}
          }
        />
        <Route
          path="/reminder"
          element={
            // <ProtectedRoute>
            <Reminder />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            //<ProtectedRoute>
            <Dashboard />
            //</ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
