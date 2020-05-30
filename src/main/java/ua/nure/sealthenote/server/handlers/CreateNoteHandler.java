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
import java.util.Arrays;
import java.util.UUID;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class CreateNoteHandler {

    public static Object handle(Request request, Response response) throws SQLException {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        ResultSet users = dataBase.executeSql("SELECT * FROM User;");
        boolean found = false;

        while (users.next()) {
            String id = users.getString("id");

            if (id.equals(token.value())) {

                found = true;

                break;
            }
        }

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        dataBase.close();

        Note note = jsonParser.fromJson(request.body(), Note.class);

        dataBase = new SealTheNoteDataBase();

        String noteId = UUID.randomUUID().toString();

        dataBase.executeSql(
                String.format("INSERT INTO Note(id, idUser, noteName, tagId, notePassword) " +
                "VALUES(%s, %s, %s, %s, %s);",
                noteId, token.value(), note.getName(), note.getTag().getId(), note.getPassword())
        );

        dataBase.close();

        NoteContentText[] contents = (NoteContentText[]) note.getContents();

        dataBase = new SealTheNoteDataBase();

        for (NoteContentText content : contents) {
            dataBase.executeSql(
                    String.format("INSERT INTO NoteContent(id, noteId, noteText, contentType)" +
                    "VALUES(%s, %s, %s, %s);",
                            UUID.randomUUID().toString(), noteId, content.getText(), "text"));
        }

        dataBase.close();

        return OK.value();
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Note.class, new NoteDeserializer());

        return builder;
    }
}
