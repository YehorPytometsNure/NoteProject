package ua.nure.sealthenote.server;

import spark.Spark;
import ua.nure.sealthenote.server.handlers.*;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class Server {

    public static void main(String[] args) {

        port(801);
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
    }
}
