package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.token.Token;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class CreateTagHandler {

    public static Object handle(Request request, Response response) {
        Token token = new Token(request.headers("Authorization"));
        String userId = token.value().replace("Bearer ", "");

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        boolean found = false;


        try {
            ResultSet users = dataBase.executeQuery("SELECT * FROM User;");

            while (users.next()) {
                String id = users.getString("id");

                if (id.equals(userId)) {

                    found = true;

                    break;
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


        dataBase.close();

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        String tagName = request.body();
        Tag tag = new Tag(UUID.randomUUID().toString(), tagName);

        dataBase = new SealTheNoteDataBase();
        try {
            dataBase.executeSql(
                    String.format("INSERT INTO Tag(id, tagName, idUser) " +
                            "VALUES('%s', '%s', '%s');", tag.getId(), tag.getName(), userId)
            );
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        dataBase.close();

        return OK.value();
    }
}
