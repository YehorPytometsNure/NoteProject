package ua.nure.sealthenote.models.userCredentails;

import com.google.gson.*;

import java.lang.reflect.Type;

public class UserCredentialsDeserializer implements JsonDeserializer<UserCredentials> {

    @Override
    public UserCredentials deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
            throws JsonParseException {

        JsonObject userCredentialsJson = (JsonObject) json;

        try {
            String login = userCredentialsJson.getAsJsonPrimitive("login").getAsString();
            String password = userCredentialsJson.getAsJsonPrimitive("password").getAsString();

            return new UserCredentials(login, password);
        } catch (ClassCastException | NullPointerException e) {

            throw new JsonParseException("Cannot parse program value from " + userCredentialsJson);
        }
    }
}
