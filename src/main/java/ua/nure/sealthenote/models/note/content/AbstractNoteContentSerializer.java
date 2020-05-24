package ua.nure.sealthenote.models.note.content;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class AbstractNoteContentSerializer implements JsonSerializer<NoteContent> {

    @Override
    public JsonElement serialize(NoteContent noteContent, Type typeOfSrc, JsonSerializationContext context) {

        if (noteContent instanceof NoteContentText) {
            return new NoteContentTextSerializer().serialize((NoteContentText) noteContent, typeOfSrc, context);
        }

        throw new IllegalArgumentException("Wrong argument passed");
    }
}
