package ua.nure.sealthenote.models.note;

import com.google.gson.*;
import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.content.NoteContentsArraySerializer;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;

import java.lang.reflect.Type;
import java.util.Arrays;

public class NotesSerializer implements JsonSerializer<Note[]> {

    @Override
    public JsonElement serialize(Note[] notes, Type typeOfSrc, JsonSerializationContext context) {

        JsonArray notesArray = new JsonArray();
        Arrays.stream(notes).forEach((note) -> {
            notesArray.add(new NoteSerializer().serialize(note, Note.class, context));
        });
        JsonObject wrapper = new JsonObject();
        wrapper.add("notes", notesArray);

        return wrapper;
    }
}
