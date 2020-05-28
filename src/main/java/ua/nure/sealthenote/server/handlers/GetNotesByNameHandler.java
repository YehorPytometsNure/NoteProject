package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.note.Note;
import ua.nure.sealthenote.models.note.NoteSerializer;
import ua.nure.sealthenote.models.note.NotesSerializer;
import ua.nure.sealthenote.models.note.content.AbstractNoteContentSerializer;
import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.content.NoteContentText;
import ua.nure.sealthenote.models.note.content.NoteContentTextSerializer;
import ua.nure.sealthenote.models.note.content.NoteContentsArraySerializer;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;
import ua.nure.sealthenote.models.token.Token;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class GetNotesByNameHandler {

    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        response.status(OK.value());
        Tag tag = new Tag("0", request.params("name"));

        return jsonParser.toJson(getNotes(tag), Note[].class);
    }

    private static Note[] getNotes(Tag tag) {

        //TODO: items should have their own tags.
        Note[] notes =  new Note[]{
                new Note("note1", "John Lennon", tag, new NoteContent[]{
                        new NoteContentText("Born at 1940"),
                        new NoteContentText("Singer of The Beatles."),
                }, ""),
                new Note("note2", "Okean Elzy", tag, new NoteContent[]{
                        new NoteContentText("Singer: S. Vakarchuk"),
                }, ""),
                new Note("note3", "Skryabin", tag, new NoteContent[]{
                        new NoteContentText("Skryabin (Ukrainian:, also transliterated as Scriabin or Skriabin)" +
                                " is a famous Ukrainian rock, pop band formed in 1989 in Novoyarivsk, Ukraine. Prominent" +
                                " Ukrainian musician Andriy \"Kuzma\" Kuzmenko (Ukrainian) was the " +
                                "band's lead singer until his death in 2015"),
                }, ""),
                new Note("note4", "University Project", tag, new NoteContent[]{
                        new NoteContentText("TODO: todo-list"),
                        new NoteContentText("Don't break anything!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
                                "Please !!!!!!!!!!!!!!!!"),
                }, "200"),
                new Note("note5", "Project Classes", tag, new NoteContent[]{
                        new NoteContentText("Done.\nMark: 200 / 100."),
                }, ""),
        };

        List<Note> filteredNotes = new ArrayList<>();
        Arrays.stream(notes).forEach(note -> {
            if (note.getName().contains(tag.getName())) {
                filteredNotes.add(note);
            }
        });

        return filteredNotes.toArray(new Note[filteredNotes.size()]);
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
