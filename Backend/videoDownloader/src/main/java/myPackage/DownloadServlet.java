package myPackage;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DownloadServlet")
public class DownloadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");

		String videoUrl = request.getParameter("videoLink");
		String format = request.getParameter("format");
		String quality = request.getParameter("quality");
		String platform = request.getParameter("platform");
		String userId = request.getParameter("user_id");

		if (!platform.equals("Unknown Platform") && !platform.equals("Invalid URL")) {
			ProcessBuilder pb = new ProcessBuilder("python",
					"D:\\FrontedJavaFullStack\\videodownloader\\src\\Components\\DownloadVideo.py",
					videoUrl, format, quality, platform);

			try {
				Process process = pb.start();

				BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
				String line;
				while ((line = reader.readLine()) != null) {
					System.out.println("PYTHON OUTPUT: " + line);
				}

				BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
				while ((line = errorReader.readLine()) != null) {
					System.err.println("PYTHON ERROR: " + line);
				}

				int exitCode = process.waitFor();
				System.out.println("Process exited with code: " + exitCode);

				// ✅ Insert history only if download was successful
				if (exitCode == 0 && userId != null && !userId.trim().isEmpty()) {
					try (Connection con = DriverManager.getConnection(
							"jdbc:mysql://localhost:3306/my_viduser", "root", "7#29sqlRAJ$@")) {

						PreparedStatement ps = con.prepareStatement(
								"INSERT INTO download_history (user_id, video_link, platform, format, quality, timestamp) VALUES (?, ?, ?, ?, ?, NOW())");
						ps.setString(1, userId);
						ps.setString(2, videoUrl);
						ps.setString(3, platform);
						ps.setString(4, format);
						ps.setString(5, quality);
						ps.executeUpdate();

						System.out.println("✅ History inserted successfully for userId: " + userId);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
				throw new ServletException("The Python process was interrupted", e);
			}
		}

		// Optional: Send success/failure message back to frontend
		PrintWriter out = response.getWriter();
		out.print("{\"status\":\"success\"}");
	}
}
