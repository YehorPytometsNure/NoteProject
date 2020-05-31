package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.user.User;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.ResultSet;
import java.sql.SQLException;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class GetUserHandler {

    public static Object handle(Request request, Response response) throws SQLException, IOException {
        Token token = new Token(request.headers("Authorization"));
        String userId = token.value().replace("Bearer ", "");

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        ResultSet users = dataBase.executeQuery("SELECT * FROM User;");
        User user = null;

        while (users.next()) {
            String id = users.getString("id");

            if (!id.equals(userId)) {
                continue;
            }

            String userName = users.getString("userName");
            String userEmail = users.getString("userEmail");
            String userPassw = users.getString("userPassw");
            String userBirthDate = users.getString("userBirthDate");
            String avatar = users.getString("avatar");

            user = new User(userEmail, userPassw);
            user.setId(id);
            user.setName(userName);
            user.setBirthDate(userBirthDate);
            user.setAvatar(avatar);
        }

        dataBase.close();

        if (user == null) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        response.header("user-name", user.getName() == null || "null".equals(user.getName()) ? "" : user.getName());
        response.header("user-id", user.getId());
        response.header("user-email", user.getEmail());
        response.header("user-password", user.getPassword());
        response.header("user-birthDate", user.getBirthDate() == null || "null".equals(user.getBirthDate()) ? "" : user.getBirthDate());

        String avatar = user.getAvatar();

        if (avatar == null || !avatar.contains(".jpg")) {
            return OK.value();
        }

        File uploadDir = new File("upload");
        File targetFile = new File(uploadDir.getPath(), avatar);

        response.status(OK.value());

        return Files.readAllBytes(targetFile.toPath());
    }
}
