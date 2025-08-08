package myPackage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONObject;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// CORS
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		// Parse JSON from request body
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
			System.out.println("Invalid JSON: " + sb.toString());
			out.write("{\"success\": false, \"message\": \"Invalid request format\"}");
			return;
		}

		System.out.println("Received Name: " + name);
		System.out.println("Received Password: " + password);

		if (name == null || name.trim().isEmpty() || password == null || password.trim().isEmpty()) {
			out.write("{\"success\": false, \"message\": \"Missing name or password\"}");
			return;
		}

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			con = CreateConnection.myConnection();

			// Check if user exists
			ps = con.prepareStatement("SELECT * FROM viduser WHERE name = ?");
			ps.setString(1, name.trim());
			rs = ps.executeQuery();

			if (rs.next()) {
				int userId = rs.getInt("user_id");
				String dbName = rs.getString("name");
				String dbPassword = rs.getString("password");
				Timestamp createdAt = rs.getTimestamp("created_at");

				System.out.println("User already exists:");
				System.out.println("ID: " + userId);
				System.out.println("Name: " + dbName);
				System.out.println("Password: " + dbPassword);
				System.out.println("Created At: " + createdAt);

				out.write("{\"success\": false, \"message\": \"Username already exists\"}");
			} else {
				ps.close();

				ps = con.prepareStatement("INSERT INTO viduser (name, password) VALUES (?, ?)", Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, name.trim());
				ps.setString(2, password);

				int rows = ps.executeUpdate();
				if (rows > 0) {
					ResultSet generatedKeys = ps.getGeneratedKeys();
					if (generatedKeys.next()) {
						int userId = generatedKeys.getInt(1);
						System.out.println("New user registered with ID: " + userId);
						out.write(String.format("{\"success\": true, \"user_id\": %d, \"message\": \"User registered successfully\"}", userId));
					} else {
						out.write("{\"success\": false, \"message\": \"User registered but ID not returned\"}");
					}
				} else {
					out.write("{\"success\": false, \"message\": \"User registration failed\"}");
				}
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
