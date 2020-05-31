package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.database.SealTheNoteDataBase;
import ua.nure.sealthenote.models.token.Token;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.ResultSet;
import java.sql.SQLException;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;
import static ua.nure.sealthenote.server.StatusCode.OK;

public class UploadUserHandler {

    public static Object handle(Request request, Response response) throws SQLException {
        Token token = new Token(request.headers("Authorization"));
        String userId = token.value().replace("Bearer ", "");

        SealTheNoteDataBase dataBase = new SealTheNoteDataBase();
        ResultSet users = dataBase.executeQuery("SELECT * FROM User;");
        boolean found = false;

        while (users.next()) {
            String id = users.getString("id");

            if (id.equals(userId)) {

                found = true;

                break;
            }
        }

        dataBase.close();

        if (!found) {
            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        //TODO: test user handling.

        String name = request.headers("user-name");
        String id = request.headers("user-id");
        String email = request.headers("user-email");
        String password = request.headers("user-password");
        String birthDate = request.headers("user-birthDate");

        dataBase = new SealTheNoteDataBase();

        try {
            File uploadDir = new File("upload");
            uploadDir.mkdir(); // create the upload directory if it doesn't exist
            File targetFile = new File(uploadDir.getPath(), "avatar-" + id + ".jpg");
            Files.deleteIfExists(targetFile.toPath());
            Path imageFile = Files.createFile(targetFile.toPath());
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            Part filePart = request.raw().getPart("avatar");
            InputStream input = filePart.getInputStream();
            Files.copy(input, imageFile, StandardCopyOption.REPLACE_EXISTING);

            dataBase.executeSql(
                    String.format("UPDATE User " +
                            "SET userName = '%s', userEmail='%s', userPassw='%s', userBirthDate='%s', avatar='%s' " +
                            "WHERE id = '%s';", name, email, password, birthDate, "avatar-" + id + ".jpg", id)
            );

        } catch (IOException | ServletException | SQLException e) {
            e.printStackTrace();

            dataBase.executeSql(
                    String.format("UPDATE User" +
                            "SET userName = '%s', userEmail='%s', userPassw='%s', userBirthDate='%s', avatar='%s' " +
                            "WHERE id = '%s';", name, email, password, birthDate, "profile_ava.jpg", id)
            );
        } finally {

            dataBase.close();
        }

        return OK.value();
    }
}
