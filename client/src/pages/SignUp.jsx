import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-indigo-200 to-cyan-200 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg max-w-md w-full p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-900">
          Sign Up
        </h2>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error-msg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center shadow-sm"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
            autoComplete="new-password"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-500 text-white font-semibold shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center mt-6 text-indigo-900">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Signup;
