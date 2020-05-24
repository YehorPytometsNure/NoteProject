package ua.nure.sealthenote.models.note.content;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;
import java.util.Arrays;

public class NoteContentsArraySerializer implements JsonSerializer<NoteContent[]> {

    @Override
    public JsonElement serialize(NoteContent[] contents, Type typeOfSrc, JsonSerializationContext context) {

        JsonArray contentsJson = new JsonArray();
        Arrays.stream(contents).forEach((content) -> {
            contentsJson.add(new AbstractNoteContentSerializer().serialize(content, content.getClass(), context));
        });

        return contentsJson;
    }
}
