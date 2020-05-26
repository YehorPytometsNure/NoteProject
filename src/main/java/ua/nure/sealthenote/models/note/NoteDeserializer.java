package ua.nure.sealthenote.models.note;

import com.google.gson.*;
import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.content.NoteContentText;
import ua.nure.sealthenote.models.note.tag.Tag;

import java.lang.reflect.Type;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class NoteDeserializer implements JsonDeserializer<Note> {

    @Override
    public Note deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {

        //TODO: create both id and add tag for note.
        JsonObject jsonObject = json.getAsJsonObject();
        String headerJson = jsonObject.getAsJsonPrimitive("name").getAsString();
        JsonArray contentsJson = jsonObject.getAsJsonArray("content");
        NoteContent[] noteContents = new NoteContent[contentsJson.size()];
        AtomicInteger i = new AtomicInteger();
        contentsJson.forEach((jsonContent) -> {
            JsonObject jsonContentObject = jsonContent.getAsJsonObject();
            String type = jsonContentObject.getAsJsonPrimitive("type").getAsString();
            JsonPrimitive jsonContentPrimitive = jsonContentObject.getAsJsonPrimitive("data");

            if (type.equals("text")) {
                String text = jsonContentPrimitive.getAsString();
                noteContents[i.getAndIncrement()] = new NoteContentText(text);
            } else {
                throw new JsonParseException("Error occurred while parsing json: not found type of note.");
            }
        });

        return new Note(UUID.randomUUID().toString(), headerJson,
                new Tag(UUID.randomUUID().toString(), "no-name"), noteContents);
    }
}
