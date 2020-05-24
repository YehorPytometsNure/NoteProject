package ua.nure.sealthenote.models.note.tag;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class TagSerializer implements JsonSerializer<Tag> {

    @Override
    public JsonElement serialize(Tag tag, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject wrapper = new JsonObject();
        wrapper.addProperty("id", tag.getId());
        wrapper.addProperty("name", tag.getName());

        return wrapper;
    }
}
