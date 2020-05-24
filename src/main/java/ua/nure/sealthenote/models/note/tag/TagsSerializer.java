package ua.nure.sealthenote.models.note.tag;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.Arrays;

public class TagsSerializer implements JsonSerializer<Tag[]> {

    @Override
    public JsonElement serialize(Tag[] tags, Type typeOfSrc, JsonSerializationContext context) {

        JsonArray tagsJson = new JsonArray();
        Arrays.stream(tags).forEach((tag) -> {
            tagsJson.add(new TagSerializer().serialize(tag, Tag.class, context));
        });

        JsonObject wrapper = new JsonObject();
        wrapper.add("tags", tagsJson);

        return wrapper;
    }
}
