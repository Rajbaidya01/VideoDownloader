import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/videoDownloader/RegisterServlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/home.js');
      } else {
        console.log(data.message);
        setError('Registration failed. Try another name.');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#14142b] p-10 rounded-2xl shadow-2xl border border-[#2e2e48]">
        <h1 className="text-3xl font-bold text-center text-[#00ff88] mb-6 drop-shadow-lg">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-[#2e2e48] p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white mb-1">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f3a] text-white border border-[#00d4ff] focus:outline-none focus:ring-2 focus:ring-[#00d4ff] transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f3a] text-white border border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
            />
          </div>

          <div className="text-center mb-6">
            <button
              type="submit"
              className="w-full bg-[#00ff88] text-[#0f0f23] font-bold py-3 rounded-xl hover:bg-[#00e67a] transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center">
            <p className="text-sm text-white">
               Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#00d4ff] hover:underline hover:text-[#00bfe0] transition"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
