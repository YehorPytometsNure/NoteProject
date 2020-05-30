package ua.nure.sealthenote.server.handlers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.token.TokenSerializer;
import ua.nure.sealthenote.models.userCredentails.UserCredentials;
import ua.nure.sealthenote.models.userCredentails.UserCredentialsDeserializer;

import java.sql.ResultSet;
import java.sql.SQLException;

import static ua.nure.sealthenote.server.StatusCode.*;

public class LogInHandler {

    public static Object handle(Request request, Response response) throws SQLException {

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
        ResultSet users = dataBase.executeSql("SELECT * FROM User;");
        String login;
        String password;
        boolean found = false;

        while (users.next()) {
            login = users.getString("userEmail");
            password = users.getString("userPassw");

            if (userCredentials.login().equals(login) && userCredentials.password().equals(password)) {

                found = true;

                break;
            }
        }

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Password or login is incorrect. Please, try again.";
        }

        String userId = users.getString("id");

        dataBase.close();

        Token accessToken = new Token(userId);
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
