package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.user.User;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;

public class GetUserHandler {

    public static Object handle(Request request, Response response) {
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

//        TODO: notfound error for not existing id parameter, passed in url.
        // Find user and set him this image.
        User user = new User("yehor.pytomets@nure.ua", "qwerty123A");
        String id = "mock-id";
        user.setName("John");
        user.setBirthDate("2012-12-22");
        user.setId(id);
        user.setAvatar("avatar-" + id + ".jpg");

        response.header("user-name", user.getName());
        response.header("user-id", user.getId());
        response.header("user-email", user.getEmail());
        response.header("user-password", user.getPassword());
        response.header("user-birthDate", user.getBirthDate());

        try {
            File uploadDir = new File("upload");
            File targetFile = new File(uploadDir.getPath(), "avatar-" + id + ".jpg");
            return Files.readAllBytes(targetFile.toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return 500;
    }
}
