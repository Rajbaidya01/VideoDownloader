package myPackage;

import java.io.IOException;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/ValidateServlet")
public class ValidateServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json"); // ✅ important

        String videoUrl = request.getParameter("videoLink");
        String platform = detectPlatform(videoUrl);
        System.out.println(platform);
        String status = (platform.equals("Invalid URL") || platform.equals("Unknown Platform")) ? "fail" : "sucess";

        String json = String.format("{\"platform\":\"%s\",\"status\":\"%s\"}", platform, status);
        response.getWriter().write(json);
    }

    private String detectPlatform(String videoUrl) {
        if (videoUrl == null || videoUrl.isEmpty())
            return "Invalid URL";

        Pattern youtubeUrl = Pattern.compile("^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*");
        Pattern facebookUrl = Pattern.compile("^(https?:\\/\\/)?(www\\.)?(facebook\\.com|fb\\.watch)\\/.*");
        Pattern instagramUrl = Pattern.compile("^(https?:\\/\\/)?(www\\.)?(instagram\\.com|instagr\\.am)\\/.*");

        if (youtubeUrl.matcher(videoUrl).find()) return "YouTube";
        if (facebookUrl.matcher(videoUrl).find()) return "Facebook";
        if (instagramUrl.matcher(videoUrl).find()) return "Instagram";
        return "Unknown Platform";
    }
}
