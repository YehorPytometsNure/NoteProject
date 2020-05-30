package ua.nure.sealthenote.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SealTheNoteDataBase {

    private ResultSet resultSet = null;
    private Statement statement = null;
    private Connection connection = null;

    public ResultSet executeSql(String sql) throws SQLException {

        final String url = "jdbc:mysql://localhost:3307/sealthenote?autoReconnect=true&useSSL=false";
        final String user = "root";
        final String password = "qwerty123A";
        connection = DriverManager.getConnection(url, user, password);
        statement = connection.createStatement();
        resultSet = statement.executeQuery(sql);

        return resultSet;
    }

    public void close() {

        try {

            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connection != null) {
                connection.close();
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
