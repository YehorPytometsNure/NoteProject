package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.token.TokenSerializer;
import ua.nure.sealthenote.models.userCredentails.UserCredentials;
import ua.nure.sealthenote.models.userCredentails.UserCredentialsDeserializer;

import static ua.nure.sealthenote.server.StatusCode.*;

public class LogInHandler {

    public static Object handle(Request request, Response response) {

        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        String requestBody = request.body();
        UserCredentials userCredentials = null;

        try {

            userCredentials = jsonParser.fromJson(requestBody, UserCredentials.class);

        } catch (JsonParseException e) {

            response.status(NOT_FOUND_ERROR.value());

            return "Cannot read duck program.";
        }

        if (!userCredentials.login().equals("admin")
                || !userCredentials.password().equals("qwerty123A")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Password or login is incorrect. Please, try again.";
        }

        Token accessToken = new Token("access-token-mock");
        response.status(OK.value());

        return jsonParser.toJson(accessToken, Token.class);
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(UserCredentials.class, new UserCredentialsDeserializer());
        builder.registerTypeAdapter(Token.class, new TokenSerializer());

        return builder;
    }
}
