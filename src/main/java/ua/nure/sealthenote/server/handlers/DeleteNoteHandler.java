package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.token.Token;

import java.sql.ResultSet;
import java.sql.SQLException;

import static ua.nure.sealthenote.server.StatusCode.*;

public class DeleteNoteHandler {

    public static Object handle(Request request, Response response) throws SQLException {
        Token token = new Token(request.headers("Authorization"));
        String userId = token.value().replace("Bearer ", "");

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        ResultSet users = dataBase.executeQuery("SELECT * FROM User;");
        boolean found = false;

        while (users.next()) {
            String id = users.getString("id");

            if (id.equals(userId)) {

                found = true;

                break;
            }
        }

        dataBase.close();

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        dataBase = new SealTheNoteDataBase();
        ResultSet notes = dataBase.executeQuery(String.format("SELECT * FROM Note WHERE idUser = '%s';", userId));
        boolean foundNote = false;
        String requestedId = request.params("id");

        while (notes.next()) {
            String id = notes.getString("id");

            if (id.equals(requestedId)) {

                foundNote = true;

                break;
            }
        }

        dataBase.close();

        if (!foundNote) {
            response.status(NOT_FOUND_ERROR.value());

            return "Note was not found";
        }

        dataBase = new SealTheNoteDataBase();
        dataBase.executeSql("DELETE FROM NoteContent WHERE noteId = '" + requestedId + "';");
        dataBase.executeSql("DELETE FROM Note WHERE id = '" + requestedId + "';");
        dataBase.close();

        return OK.value();
    }
}
