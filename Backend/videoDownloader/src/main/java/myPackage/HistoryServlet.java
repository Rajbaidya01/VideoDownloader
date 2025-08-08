package myPackage;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/HistoryServlet")
public class HistoryServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Ensure correct character encoding for POST body
        request.setCharacterEncoding("UTF-8");

        // Allow CORS from frontend
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Force parsing of parameters (required in some servlet containers)
        request.getParameterMap();

        // Get user_id
        String userId = request.getParameter("user_id");
        System.out.println("userID is " + userId);

        JSONArray historyArray = new JSONArray();

        try (Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/my_viduser", "root", "7#29sqlRAJ$@")) {

            PreparedStatement stmt = con.prepareStatement(
                "SELECT * FROM download_history WHERE user_id = ?"
            );
            stmt.setString(1, userId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                JSONObject obj = new JSONObject();
                obj.put("videoLink", rs.getString("video_link"));
                obj.put("platform", rs.getString("platform"));
                obj.put("format", rs.getString("format"));
                obj.put("quality", rs.getString("quality"));
                obj.put("timestamp", rs.getString("timestamp"));
                historyArray.put(obj);
            }

            PrintWriter out = response.getWriter();
            out.print(historyArray.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
