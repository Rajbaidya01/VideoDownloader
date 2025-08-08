import React from "react";

const LearnMore = () => {
  return (
    <div className="px-4 py-8 text-white bg-[#0f0f23] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
          {/* Left side: headings */}
          <div className="md:flex-1 max-w-md flex flex-col items-center justify-center min-h-full">
            <h4 className="text-lg md:text-xl font-bold text-[#00ff88] mb-3 tracking-wide uppercase drop-shadow-md">
              How to Use
            </h4>

            <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-white pb-16 drop-shadow-lg tracking-tight flex items-center gap-3 whitespace-nowrap">
              VydaxYeager
              <span className="text-[#00ff88] text-4xl leading-none">→</span>
            </h3>
          </div>

          {/* Right side: ordered list */}
          <ol className="md:flex-1 list-decimal pl-8 md:pl-12 text-white/90 text-base md:text-lg leading-relaxed space-y-10 marker:text-[#00d4ff] marker:text-3xl marker:font-extrabold">
            <li className="bg-[#1a1a2e] hover:bg-[#22223a] transition duration-300 rounded-xl p-5 md:p-7 shadow-lg">
              <span className="block text-xl font-semibold text-[#00d4ff] mb-3">
                Find Video
              </span>
              <p className="text-[#ffffffcc] hover:text-white transition-colors duration-300">
                Locate the video you want on YouTube and copy its URL.
              </p>
            </li>
            <li className="bg-[#1a1a2e] hover:bg-[#22223a] transition duration-300 rounded-xl p-5 md:p-7 shadow-lg">
              <span className="block text-xl font-semibold text-[#00d4ff] mb-3">
                Paste Video Link
              </span>
              <p className="text-[#ffffffcc] hover:text-white transition-colors duration-300">
                Paste the copied link into the input box and wait for the system
                to display download options in various formats and sizes.
              </p>
            </li>
            <li className="bg-[#1a1a2e] hover:bg-[#22223a] transition duration-300 rounded-xl p-5 md:p-7 shadow-lg">
              <span className="block text-xl font-semibold text-[#00d4ff] mb-3">
                Download Video
              </span>
              <p className="text-[#ffffffcc] hover:text-white transition-colors duration-300">
                Finally, choose your preferred format and click download to save
                the video to your device.
              </p>
            </li>
          </ol>
        </div>
      </div>

      <h3 className="text-3xl font-bold mt-16 mb-4 text-center text-[#00d4ff] uppercase tracking-widest">
        Why Choose
      </h3>

      <h2 className="text-6xl font-black mb-32 pt-6 pb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-white drop-shadow-[0_4px_30px_rgba(0,212,255,0.6)] border-b-4 border-[#00d4ff] w-fit mx-auto tracking-wider animate-pulse rounded-lg px-4">
        VydaxYeager
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-[#00d4ff] via-[#00ff88] to-[#1a1a2e] p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
          <h4 className="text-xl font-semibold text-[#0f0f23] mb-4">
            High Quality
          </h4>
          <p className="text-[#0f0f23] opacity-90">
            Download videos from the entire YouTube library in high quality and
            short time. Supports MP4 and MP3 formats without loss.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#00d4ff] to-[#00ff88] p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
          <h4 className="text-xl font-semibold text-white mb-4">
            Fast Downloading
          </h4>
          <p className="text-white opacity-90">
            Quickly download your favorite videos from YouTube with just a few
            clicks—no waiting, no fees.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#00ff88] via-[#00d4ff] to-[#1a1a2e] p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
          <h4 className="text-xl font-semibold text-[#0f0f23] mb-4">
            Unlimited Downloads
          </h4>
          <p className="text-[#0f0f23] opacity-90">
            Enjoy unlimited downloads anytime, without restrictions. High-speed
            transfer supported.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#00ff88] to-[#00d4ff] p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300">
          <h4 className="text-xl font-semibold text-white mb-4">
            Supports All Devices
          </h4>
          <p className="text-white opacity-90">
            This online YouTube downloader works across all major
            platforms—Windows, Linux, macOS, Android, and iOS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
