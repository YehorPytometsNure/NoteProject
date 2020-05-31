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
    private final String url = "jdbc:mysql://localhost:3307/sealthenote?autoReconnect=true&useSSL=false";
    private final String user = "root";
    private final String password = "qwerty123A";

    public ResultSet executeQuery(String sql) throws SQLException {
        connection = DriverManager.getConnection(url, user, password);
        statement = connection.createStatement();
        resultSet = statement.executeQuery(sql);

        return resultSet;
    }

    public int executeUpdate(String sql) throws SQLException {
        connection = DriverManager.getConnection(url, user, password);
        statement = connection.createStatement();
        return statement.executeUpdate(sql);
    }

    public boolean executeSql(String sql) throws SQLException {
        connection = DriverManager.getConnection(url, user, password);
        statement = connection.createStatement();
        return statement.execute(sql);
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
