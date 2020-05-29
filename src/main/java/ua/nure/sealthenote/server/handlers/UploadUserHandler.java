package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.token.Token;
import ua.nure.sealthenote.models.user.User;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;

public class UploadUserHandler {

    public static Object handle(Request request, Response response) {
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

//        TODO: notfound error for not existing id parameter, passed in url.

        String name = request.headers("user-name");
        String id = request.headers("user-id");
        String email = request.headers("user-email");
        String password = request.headers("user-password");
        String birthDate = request.headers("user-birthDate");

        try {
            File uploadDir = new File("upload");
            uploadDir.mkdir(); // create the upload directory if it doesn't exist
            File targetFile = new File(uploadDir.getPath(), "avatar-" + id + ".jpg");
            Path imageFile = Files.createFile(targetFile.toPath());
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            Part filePart = request.raw().getPart("avatar");
            InputStream input = filePart.getInputStream();
            Files.copy(input, imageFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException | ServletException e) {
            e.printStackTrace();
        }

        // Find user and set him this image.
        User user = new User(email, password);
        user.setName(name);
        user.setBirthDate(birthDate);
        user.setId(id);
        user.setAvatar("avatar-" + id + ".jpg");

        return 200;
    }
}
