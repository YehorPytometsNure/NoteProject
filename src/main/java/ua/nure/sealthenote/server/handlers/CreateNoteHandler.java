package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.note.Note;
import ua.nure.sealthenote.models.note.NoteDeserializer;
import ua.nure.sealthenote.models.token.Token;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;

public class CreateNoteHandler {

    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        Note parsedNote = jsonParser.fromJson(request.body(), Note.class);

        return 200;
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Note.class, new NoteDeserializer());

        return builder;
    }
}
