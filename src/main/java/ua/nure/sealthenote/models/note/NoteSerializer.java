package ua.nure.sealthenote.models.note;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.content.NoteContentsArraySerializer;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;

import java.lang.reflect.Type;

public class NoteSerializer implements JsonSerializer<Note> {

    @Override
    public JsonElement serialize(Note note, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject wrapper = new JsonObject();
        wrapper.addProperty("id", note.getId());
        wrapper.addProperty("name", note.getName());
        wrapper.addProperty("password", note.getPassword());
        wrapper.add("tag", new TagSerializer().serialize(note.getTag(), Tag.class, context));
        wrapper.add("contents", new NoteContentsArraySerializer().serialize(note.getContents(), NoteContent[].class, context));

        return wrapper;
    }
}
