import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const updateUserId = () => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  };

  // On mount, and listen for login/logout events
  useEffect(() => {
    updateUserId();

    window.addEventListener('login', updateUserId);
    window.addEventListener('logout', updateUserId);

    return () => {
      window.removeEventListener('login', updateUserId);
      window.removeEventListener('logout', updateUserId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setUserId(null);
    window.dispatchEvent(new Event('logout'));  // Notify other components
    navigate('/home'); // Redirect after logout
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f23] shadow-lg rounded-xl border border-[#1a1a2e]">
      {/* Title */}
      <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#ffffff] tracking-wide drop-shadow-md hover:drop-shadow-lg transition-all duration-300">
        VydaxYeager
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-[#ffffff] text-opacity-80 font-medium">
        <a href="/home" className="hover:text-[#00d4ff] transition duration-200">Home</a>
        <a href="/#" className="hover:text-[#00d4ff] transition duration-200">About Us</a>
        <a href="/#" className="hover:text-[#00d4ff] transition duration-200">Contact</a>
      </div>

      {/* Login / Logout & Welcome */}
      <div className="flex items-center gap-4">
        {userId ? (
          <>
            <span className="text-[#00ff88] font-semibold">Welcome</span>
            <button
              className="px-5 py-2.5 rounded-lg bg-[#1a1a2e] text-[#00ff88] font-semibold shadow-md border border-[#00ff88] hover:bg-[#00ff88] hover:text-[#0f0f23] transition-all duration-300"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <button
            className="px-5 py-2.5 rounded-lg bg-[#00d4ff] text-[#0f0f23] font-semibold shadow-md hover:bg-[#00bfe0] transition-all duration-300"
            onClick={() => navigate('/Loginout')}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
