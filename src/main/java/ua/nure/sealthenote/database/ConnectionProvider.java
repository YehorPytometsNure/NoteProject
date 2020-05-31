package ua.nure.sealthenote.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionProvider {

    private final static String url = "jdbc:mysql://b8ce67814f22ba:7e2e1bc1@us-cdbr-east-05.cleardb.net/heroku_be2ff38d4e70fc8?reconnect=true";
    private final static String user = "root";
    private final static String password = "qwerty123A";

    private static Connection connection;

    public static Connection getConnection() {

        try {
            if (connection == null || connection.isClosed() || !connection.isValid(1000)) {
                connection = DriverManager.getConnection(url, user, password);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return connection;
    }
}
