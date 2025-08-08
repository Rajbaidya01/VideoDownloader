package myPackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class CreateConnection {
	public static Connection myConnection() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.cj.jdbc.Driver");
        final String URL="jdbc:mysql://localhost:3306/my_viduser";
		final String USER="root";
		final String PASSWORD="7#29sqlRAJ$@";
		Connection con=DriverManager.getConnection(URL,USER,PASSWORD);
		return con;
	}
}
