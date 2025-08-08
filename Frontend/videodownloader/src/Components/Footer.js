import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f23] text-[#ffffff] py-6 px-6 border-t border-[#1a1a2e] shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Left: Branding */}
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#ffffff]">
            VydaxYeager
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Your smart video downloader.
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex justify-center space-x-6 font-medium text-white/80">
          <a href="/#" className="hover:text-[#00ff88] transition">Home</a>
          <a href="/#" className="hover:text-[#00ff88] transition">About Us</a>
          <a href="/#" className="hover:text-[#00ff88] transition">Contact</a>
        </div>

        {/* Right: Credits */}
        <div className="text-sm text-white/60 text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} VydaxYeager</p>
          <p className="mt-1">Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
