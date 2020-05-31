package ua.nure.sealthenote.database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SealTheNoteDataBase {

    public ResultSet executeQuery(String sql) throws SQLException {
        Connection connection = ConnectionProvider.getConnection();
        Statement statement = connection.createStatement();

        return statement.executeQuery(sql);
    }

    public int executeUpdate(String sql) throws SQLException {
        Connection connection = ConnectionProvider.getConnection();
        Statement statement = connection.createStatement();
        return statement.executeUpdate(sql);
    }

    public boolean executeSql(String sql) throws SQLException {
        Connection connection = ConnectionProvider.getConnection();
        Statement statement = connection.createStatement();
        return statement.execute(sql);
    }
}
