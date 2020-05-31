package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
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

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.NOT_FOUND_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class GetNotesHandler {

    public static Object handle(Request request, Response response) throws SQLException {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
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
        String tagId = request.params("tagId");
        ResultSet notesByTagResponse = dataBase.executeQuery("SELECT * FROM Note WHERE " +
                "Note.idUser = '" + userId + "' AND " +
                "Note.tagId = '" + tagId + "';");

        List<Note> notes = new ArrayList<>();

        while (notesByTagResponse.next()) {
            String noteId = notesByTagResponse.getString("id");
            String noteName = notesByTagResponse.getString("noteName");

            ResultSet tags = dataBase.executeQuery("SELECT * FROM Tag WHERE id = '" + tagId + "';");
            String tagName = null;

            while (tags.next()) {
                tagName = tags.getString("tagName");
            }

            if (tagName == null) {
                response.status(NOT_FOUND_ERROR.value());

                return "Tag for note was not found.";
            }

            Tag tag = new Tag(tagId, tagName);
            String notePassword = notesByTagResponse.getString("notePassword");

            ResultSet mappedContent = dataBase.executeQuery("SELECT * FROM NoteContent WHERE noteId = '" + noteId + "';");

            List<NoteContentText> contentTexts = new ArrayList<>();

            while (mappedContent.next()) {
                String noteText = mappedContent.getString("noteText");
                NoteContentText noteContentText = new NoteContentText(noteText);
                contentTexts.add(noteContentText);
            }

            Note note = new Note(noteId, noteName, tag,
                    contentTexts.toArray(new NoteContent[contentTexts.size()]), notePassword);

            notes.add(note);
        }

        response.status(OK.value());

        return jsonParser.toJson(notes.toArray(new Note[notes.size()]), Note[].class);
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
