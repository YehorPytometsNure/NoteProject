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

import static ua.nure.sealthenote.server.StatusCode.*;

public class UpdateNoteHandler {

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

        String noteId = note.getId();
        String passwordToSet = note.getPassword() == null || "null".equals(note.getPassword()) ? "" : note.getPassword();

        try {
            String binTagId = null;

            if ("bin".equals(note.getTag().getName())) {
                ResultSet tags = dataBase.executeQuery("SELECT * FROM Tag WHERE idUser = '" + userId + "' AND tagName = 'bin';");

                while (tags.next()) {
                    binTagId = tags.getString("id");
                }

                if (binTagId == null) {
                    response.status(NOT_FOUND_ERROR.value());

                    return "Tag for note was not found.";
                }
            }

            dataBase.executeSql(
                    String.format("UPDATE Note " +
                                    "SET noteName = '%s', tagId='%s', notePassword='%s' " +
                                    "WHERE id = '%s' AND idUser = '%s';",
                            note.getName(), binTagId == null ? note.getTag().getId() : binTagId, passwordToSet, noteId, userId)
            );
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        dataBase = new SealTheNoteDataBase();

        try {
            dataBase.executeSql(String.format("DELETE FROM NoteContent WHERE noteId = '%s';", noteId));
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        for (NoteContent content : note.getContents()) {
            try {
                dataBase.executeSql(
                        String.format("INSERT INTO NoteContent(id, noteId, noteText, contentType) " +
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
