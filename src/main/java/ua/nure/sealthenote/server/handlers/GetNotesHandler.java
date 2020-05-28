package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.note.Note;
import ua.nure.sealthenote.models.note.NoteSerializer;
import ua.nure.sealthenote.models.note.NotesSerializer;
import ua.nure.sealthenote.models.note.content.*;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;
import ua.nure.sealthenote.models.token.Token;

import static ua.nure.sealthenote.server.StatusCode.*;

public class GetNotesHandler {

    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        if (request.params("tagId").equals("tag1")) {
            response.status(OK.value());

            return jsonParser.toJson(getMusicNotes(), Note[].class);
        }

        if (request.params("tagId").equals("tag2")) {
            response.status(OK.value());

            return jsonParser.toJson(getEducationNotes(), Note[].class);
        }

        if (request.params("tagId").equals("tag3")) {
            response.status(OK.value());

            return jsonParser.toJson(getJobNotes(), Note[].class);
        }

        response.status(NOT_FOUND_ERROR.value());

        return "Notes for asked tag don't exist.";
    }

    private static Note[] getMusicNotes() {
        Tag musicTag = new Tag("tag1", "Music");

        return new Note[]{
                new Note("note1", "John Lennon", musicTag, new NoteContent[]{
                        new NoteContentText("Born at 1940"),
                        new NoteContentText("Singer of The Beatles."),
                }, ""),
                new Note("note2", "Okean Elzy", musicTag, new NoteContent[]{
                        new NoteContentText("Singer: S. Vakarchuk"),
                }, ""),
                new Note("note3", "Skryabin", musicTag, new NoteContent[]{
                        new NoteContentText("Skryabin (Ukrainian:, also transliterated as Scriabin or Skriabin)" +
                                " is a famous Ukrainian rock, pop band formed in 1989 in Novoyarivsk, Ukraine. Prominent" +
                                " Ukrainian musician Andriy \"Kuzma\" Kuzmenko (Ukrainian) was the " +
                                "band's lead singer until his death in 2015"),
                }, ""),
        };
    }

    private static Note[] getEducationNotes() {
        Tag educationTag = new Tag("tag2", "Education");

        return new Note[]{
                new Note("note4", "University Project", educationTag, new NoteContent[]{
                        new NoteContentText("TODO: todo-list"),
                        new NoteContentText("Don't break anything!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
                                "Please !!!!!!!!!!!!!!!!"),
                }, ""),
                new Note("note5", "Project Classes", educationTag, new NoteContent[]{
                        new NoteContentText("Done.\nMark: 200 / 100."),
                }, ""),
        };
    }

    private static Note[] getJobNotes() {
        return new Note[0];
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Note.class, new NoteSerializer());
        builder.registerTypeAdapter(Note[].class, new NotesSerializer());
        builder.registerTypeAdapter(Tag.class, new TagSerializer());
        builder.registerTypeAdapter(NoteContent[].class, new NoteContentsArraySerializer());
        builder.registerTypeAdapter(NoteContent.class, new AbstractNoteContentSerializer());
        builder.registerTypeAdapter(NoteContentText.class, new NoteContentTextSerializer());

        return builder;
    }
}
