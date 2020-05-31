package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.note.tag.TagSerializer;
import ua.nure.sealthenote.models.note.tag.TagsSerializer;
import ua.nure.sealthenote.models.token.Token;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class GetAllTagsHandler {
    public static Object handle(Request request, Response response) {
        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        Token token = new Token(request.headers("Authorization"));
        String userId = token.value().replace("Bearer ", "");

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        ResultSet users = null;
        boolean found = false;

        try {
            users = dataBase.executeQuery("SELECT * FROM User;");

            while (users.next()) {
                String id = users.getString("id");

                if (id.equals(userId)) {

                    found = true;

                    break;
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        dataBase.close();

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        dataBase = new SealTheNoteDataBase();
        ResultSet tagsResponse = null;
        List<Tag> tagList = new ArrayList<>();

        try {
            tagsResponse = dataBase.executeQuery("SELECT * FROM Tag WHERE Tag.idUser = '" + userId + "';");
            while (tagsResponse.next()) {
                String tagId = tagsResponse.getString("id");
                String tagName = tagsResponse.getString("tagName");
                tagList.add(new Tag(tagId, tagName));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        dataBase.close();
        response.status(OK.value());

        return jsonParser.toJson(tagList.toArray(new Tag[tagList.size()]), Tag[].class);
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(Tag.class, new TagSerializer());
        builder.registerTypeAdapter(Tag[].class, new TagsSerializer());

        return builder;
    }
}
