package ua.nure.sealthenote.server;

import spark.Spark;
import ua.nure.sealthenote.server.handlers.*;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class Server {

    public static void main(String[] args) {

//        port(802);
        int port = getHerokuAssignedPort();
        System.out.println(String.format("Post: %d", port));
        port(port);
        staticFiles.location("/public");

        Spark.post("/login", LogInHandler::handle);
        Spark.post("/registration", RegistrationHandler::handle);
        Spark.get("/notes/:tagId/content", GetNotesHandler::handle);
        Spark.get("/tags/previous", GetPreviouslyVisitedTagsHandler::handle);
        Spark.post("/note", CreateNoteHandler::handle);
        Spark.put("/note/:id", UpdateNoteHandler::handle);
        Spark.delete("/note/:id", DeleteNoteHandler::handle);
        Spark.get("/tags/all", GetAllTagsHandler::handle);
        Spark.post("/tag", CreateTagHandler::handle);
        Spark.get("/notes/:name/contentByName", GetNotesByNameHandler::handle);
        Spark.post("/user", "multipart/form-data", UploadUserHandler::handle);
        Spark.get("/user", GetUserHandler::handle);
    }

    private static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }
}
