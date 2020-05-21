package ua.nure.sealthenote.models.token;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class TokenSerializer implements JsonSerializer<Token> {

    @Override
    public JsonElement serialize(Token token, Type typeOfSrc, JsonSerializationContext context) {

        JsonObject wrapper = new JsonObject();
        wrapper.addProperty("token", token.value());

        return wrapper;
    }
}
