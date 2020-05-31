package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.errors.ValidationError;
import ua.nure.sealthenote.models.errors.ValidationErrorsSerializer;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.token.TokenSerializer;
import ua.nure.sealthenote.models.userCredentails.UserCredentials;
import ua.nure.sealthenote.models.userCredentails.UserCredentialsDeserializer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

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

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        try {

            ResultSet users = dataBase.executeQuery("SELECT * FROM User;");

            while (users.next()) {
                String login = users.getString("userEmail");

                if (userCredentials.login().equals(login)) {

                    response.status(VALIDATION_ERROR.value());

                    ValidationError validationError = new ValidationError(
                            "login",
                            "Login admin already exists. Please try a new one."
                    );

                    return jsonParser.toJson(new ValidationError[]{
                            validationError,
                    }, ValidationError[].class);
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        String userId = UUID.randomUUID().toString();

        dataBase = new SealTheNoteDataBase();
        try {
            dataBase.executeSql(
                    String.format("INSERT INTO User(id, userEmail, userPassw, avatar) " +
                            "VALUES ('%s', '%s', '%s', '%s');",
                            userId, userCredentials.login(), userCredentials.password(), "profile_ava.jpg"
                    )
            );
            dataBase.executeSql(
                    String.format("INSERT INTO Tag(id, tagName, idUser) " +
                            "VALUES ('%s', '%s', '%s');",
                            UUID.randomUUID().toString(), "bin", userId
                    )
            );
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        response.status(OK.value());
        Token accessToken = new Token(userId);

        return jsonParser.toJson(accessToken, Token.class);
    }

    private static GsonBuilder setUpGsonBuilder() {

        GsonBuilder builder = new GsonBuilder();
        builder.registerTypeAdapter(UserCredentials.class, new UserCredentialsDeserializer());
        builder.registerTypeAdapter(ValidationError[].class, new ValidationErrorsSerializer());
        builder.registerTypeAdapter(Token.class, new TokenSerializer());

        return builder;
    }
}
