package ua.nure.sealthenote.models.note.content;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class NoteContentTextSerializer implements JsonSerializer<NoteContentText> {

    @Override
    public JsonElement serialize(NoteContentText content, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject wrapper = new JsonObject();
        wrapper.addProperty("type", "text");
        wrapper.addProperty("data", content.getText());

        return wrapper;
    }
}
