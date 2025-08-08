import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [videoLink, setVideoLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [format, setFormat] = useState("");
  const [quality, setQuality] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleValidateLink = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/Loginout");
      return;
    }

    if (!videoLink.trim()) {
      setMessage("⚠ Please paste a video link.");
      setMessageType("error");
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/videoDownloader/ValidateServlet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `videoLink=${encodeURIComponent(videoLink)}`,
        }
      );

      const result = await response.json();
      if (result.status === "sucess") {
        setPlatform(result.platform);
        setIsValid(true);
        setMessage(`✔ Valid ${result.platform} link detected!`);
        setMessageType("success");
      } else {
        setMessage("❌ Invalid or unsupported video link.");
        setMessageType("error");
        setIsValid(false);
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
      setMessageType("error");
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/Loginout");
      return;
    }

    if (!format || !quality) {
      setMessage("⚠ Please select both format and quality.");
      setMessageType("error");
      return;
    }

    setIsDownloading(true);
    setDownloadStatus("");

    try {
      const response = await fetch(
        "http://localhost:8080/videoDownloader/DownloadServlet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `videoLink=${encodeURIComponent(
            videoLink
          )}&format=${format}&quality=${quality}&platform=${platform}&user_id=${userId}`,
        }
      );

      const result = await response.text();
      console.log("Download response:", result);
      setDownloadStatus("✅ Download Complete");
    } catch (err) {
      setDownloadStatus("❌ Download Failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center px-4">
      {/* Container with relative positioning */}
      <div className="relative max-w-2xl w-full bg-transparent text-center">
        {/* Button positioned absolutely inside container at top right */}
        <div className="absolute right-8 top-4">
          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2 bg-[#1a1a2e] border border-[#00d4ff] text-[#00d4ff] rounded-lg shadow-md hover:bg-[#00d4ff] hover:text-[#0f0f23] transition duration-300"
          >
            View History
          </button>
        </div>

        <h1 className="text-6xl font-extrabold mb-12 leading-snug text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#ffffff] drop-shadow-lg">
          <span className="block">Download</span>
          <span className="block">Video Or Audio</span>
          <span className="block">by Link</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Paste link here..."
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full max-w-md px-5 py-3 text-[#ffffff] bg-[#1a1a2e] border border-[#00d4ff] rounded-xl shadow-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#00d4ff] transition duration-300"
          />
          <button
            onClick={handleValidateLink}
            className="px-6 py-3 bg-[#00ff88] text-[#0f0f23] font-semibold rounded-lg shadow-md hover:brightness-110 transition duration-300"
          >
            Validate
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center mb-4">
            <div className="w-6 h-6 border-4 border-t-transparent border-[#00ff88] rounded-full animate-spin"></div>
          </div>
        )}

        {message && (
          <div
            className={`mt-2 mb-6 px-4 py-2 rounded-lg max-w-md mx-auto text-sm font-medium shadow-md transition-all duration-300 ${
              messageType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        {isValid && ["YouTube", "Facebook", "Instagram"].includes(platform) && (
          <div className="mb-8">
            <p className="text-[#00d4ff] mb-2 font-medium">
              Detected Platform: {platform}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full max-w-md px-5 py-3 text-white bg-[#1a1a2e] border border-[#00d4ff] rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#00d4ff] hover:border-[#00ff88] transition duration-300 cursor-pointer"
              >
                <option value="">Select Format</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>

              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full max-w-md px-5 py-3 text-[#ffffff] bg-[#1a1a2e] border border-[#00d4ff] rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#00d4ff] transition duration-300"
              >
                <option value="">Select Quality</option>
                <option value="144p">144p</option>
                <option value="360p">360p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="best">Best</option>
              </select>
            </div>

            {isDownloading && (
              <div className="flex justify-center mb-4">
                <div className="w-6 h-6 border-4 border-t-transparent border-[#00d4ff] rounded-full animate-spin"></div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isDownloading || !format || !quality}
              className={`px-6 py-3 bg-[#00d4ff] text-[#0f0f23] font-semibold rounded-lg shadow-md transition duration-300 ${
                isDownloading || !format || !quality
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:brightness-110"
              }`}
            >
              {isDownloading ? "Downloading..." : "Submit"}
            </button>

            {downloadStatus && (
              <h1 className="text-3xl text-green-400 font-bold mt-6">
                {downloadStatus}
              </h1>
            )}
          </div>
        )}

        <h4 className="text-xl font-semibold text-[#00d4ff] mb-2">
          Video Downloader
        </h4>

        <p className="text-[#ffffff] text-opacity-80 mb-6 px-4">
          With this platform you can easily download any video from YouTube,
          Facebook, Instagram for free.
        </p>

        <button
          onClick={() => navigate("/LearnMore")}
          className="px-8 py-3 bg-[#1a1a2e] text-[#00d4ff] border border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#0f0f23] font-semibold rounded-lg shadow-md transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
