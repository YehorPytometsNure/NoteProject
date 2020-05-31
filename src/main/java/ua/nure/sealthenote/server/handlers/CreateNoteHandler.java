package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.note.Note;
import ua.nure.sealthenote.models.note.NoteDeserializer;
import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.content.NoteContentText;
import ua.nure.sealthenote.models.token.Token;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class CreateNoteHandler {

    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
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

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        Note note = jsonParser.fromJson(request.body(), Note.class);

        dataBase = new SealTheNoteDataBase();

        String noteId = UUID.randomUUID().toString();
        String passwordToSet = note.getPassword() == null || "null".equals(note.getPassword()) ? "" : note.getPassword();

        try {
            dataBase.executeSql(
                    String.format("INSERT INTO Note(id, idUser, noteName, tagId, notePassword) " +
                                    "VALUES('%s', '%s', '%s', '%s', '%s');",
                            noteId, userId, note.getName(), note.getTag().getId(), passwordToSet)
            );
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        dataBase = new SealTheNoteDataBase();

        for (NoteContent content : note.getContents()) {
            try {
                dataBase.executeSql(
                        String.format("INSERT INTO NoteContent(id, noteId, noteText, contentType)" +
                                        "VALUES('%s', '%s', '%s', '%s');",
                                UUID.randomUUID().toString(), noteId, ((NoteContentText) content).getText(), "text"));
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

        return OK.value();
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Note.class, new NoteDeserializer());

        return builder;
    }
}
