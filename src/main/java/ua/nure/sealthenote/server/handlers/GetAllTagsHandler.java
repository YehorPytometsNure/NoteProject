package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;
import ua.nure.sealthenote.models.note.tag.TagsSerializer;
import ua.nure.sealthenote.models.token.Token;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class GetAllTagsHandler {
    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        Tag[] tags = new Tag[]{
                new Tag("tag1", "Music"),
                new Tag("tag2", "Education"),
                new Tag("tag3", "Job"),
        };
        response.status(OK.value());

        return jsonParser.toJson(tags, Tag[].class);
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Tag.class, new TagSerializer());
        builder.registerTypeAdapter(Tag[].class, new TagsSerializer());

        return builder;
    }
}
