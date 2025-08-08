import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("user_id");
  console.log(userId);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/videoDownloader/HistoryServlet", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `user_id=${encodeURIComponent(userId)}`,
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error("Invalid response format:", data);
          setHistory([]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#00d4ff]">Download History</h1>

      {history.length === 0 ? (
        <p className="text-gray-400">No history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#00d4ff] rounded-xl text-sm sm:text-base">
            <thead>
              <tr className="bg-[#1a1a2e] text-left">
                <th className="p-3 border-r border-[#2e2e48]">Platform</th>
                <th className="p-3 border-r border-[#2e2e48]">Format</th>
                <th className="p-3 border-r border-[#2e2e48]">Quality</th>
                <th className="p-3 border-r border-[#2e2e48]">Link</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-t border-[#2e2e48] hover:bg-[#1a1a2e]/50">
                  <td className="p-3">{item.platform}</td>
                  <td className="p-3">{item.format}</td>
                  <td className="p-3">{item.quality}</td>
                  <td className="p-3">
                    <a
                      href={item.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3">{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
