package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.errors.ValidationError;
import ua.nure.sealthenote.models.errors.ValidationErrorsSerializer;
import ua.nure.sealthenote.models.userCredentails.UserCredentials;
import ua.nure.sealthenote.models.userCredentails.UserCredentialsDeserializer;

import static ua.nure.sealthenote.server.StatusCode.*;

public class RegistrationHandler {

    public static Object handle(Request request, Response response) {

        GsonBuilder gsonBuilder = setUpGsonBuilder();
        Gson jsonParser = gsonBuilder.create();
        String requestBody = request.body();
        UserCredentials userCredentials;

        try {

            userCredentials = jsonParser.fromJson(requestBody, UserCredentials.class);

        } catch (JsonParseException e) {

            response.status(NOT_FOUND_ERROR.value());

            return "Cannot read user credentials.";
        }

        if (userCredentials.login().equals("admin")) {

            response.status(VALIDATION_ERROR.value());

            ValidationError validationError = new ValidationError(
                    "login",
                    "Login admin already exists. Please try a new one."
            );

            return jsonParser.toJson(new ValidationError[]{
                    validationError,
            }, ValidationError[].class);
        }

        return OK.value();
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(UserCredentials.class, new UserCredentialsDeserializer());
        builder.registerTypeAdapter(ValidationError[].class, new ValidationErrorsSerializer());

        return builder;
    }
}
