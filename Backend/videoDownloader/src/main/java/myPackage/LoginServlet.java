package myPackage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONObject;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// CORS headers
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		// Parse JSON body
		StringBuilder sb = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line;
		while ((line = reader.readLine()) != null) {
			sb.append(line);
		}

		String name = null;
		String password = null;

		try {
			JSONObject json = new JSONObject(sb.toString());
			name = json.getString("name");
			password = json.getString("password");
		} catch (Exception e) {
			System.out.println("Invalid JSON input: " + sb.toString());
			out.write("{\"success\": false, \"message\": \"Invalid request format\"}");
			return;
		}

		System.out.println("Login request received:");
		System.out.println("Name: " + name);
		System.out.println("Password: " + password);

		if (name == null || password == null || name.trim().isEmpty() || password.trim().isEmpty()) {
			out.write("{\"success\": false, \"message\": \"Missing name or password\"}");
			return;
		}

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			con = CreateConnection.myConnection();
			ps = con.prepareStatement("SELECT user_id, password FROM viduser WHERE name = ?");
			ps.setString(1, name.trim());
			rs = ps.executeQuery();

			if (rs.next()) {
				String storedPassword = rs.getString("password");
				int userId = rs.getInt("user_id");

				if (password.equals(storedPassword)) {
					System.out.println("✅ Login successful for user ID: " + userId);
					out.write(String.format("{\"success\": true, \"user_id\": %d, \"message\": \"Valid password\"}", userId));
				} else {
					System.out.println("❌ Invalid password for user: " + name);
					out.write("{\"success\": false, \"message\": \"Invalid password\"}");
				}
			} else {
				System.out.println("❌ User not found: " + name);
				out.write("{\"success\": false, \"message\": \"User not found\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
			out.write("{\"success\": false, \"message\": \"Server error\"}");
		} finally {
			try { if (rs != null) rs.close(); } catch (Exception e) {}
			try { if (ps != null) ps.close(); } catch (Exception e) {}
			try { if (con != null) con.close(); } catch (Exception e) {}
		}
	}

	@Override
	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setStatus(HttpServletResponse.SC_OK);
	}
}
