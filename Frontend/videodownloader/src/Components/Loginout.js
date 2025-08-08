import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Loginout = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/videoDownloader/LoginServlet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user_id", data.user_id);
        window.dispatchEvent(new Event("login")); // <-- Add this here
        navigate("/home");
      } else {
        console.log(data.message);
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1f1f3a]/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-[#2e2e48]">
        <h1 className="text-3xl font-extrabold text-center text-[#00ff88] mb-6 tracking-wide drop-shadow">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-[#2e2e48] p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <label className="block text-white mb-1 font-medium">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-5 px-4 py-3 rounded-xl bg-[#0f0f23] text-white border border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff] transition-all"
            required
          />

          <label className="block text-white mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-[#0f0f23] text-white border border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00ff88] to-[#00e67a] text-[#0f0f23] font-bold py-3 rounded-xl shadow-md hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-white">
            New user?{" "}
            <Link
              to="/signup"
              className="text-[#00d4ff] font-medium hover:underline hover:text-[#00bfe0] transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginout;
