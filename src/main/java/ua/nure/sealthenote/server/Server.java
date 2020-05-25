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
    }
}
