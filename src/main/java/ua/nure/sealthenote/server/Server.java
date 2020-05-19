package ua.nure.sealthenote.server;

import spark.Spark;
import ua.nure.sealthenote.server.handlers.LogInHandler;
import ua.nure.sealthenote.server.handlers.RegistrationHandler;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class Server {

    public static void main(String[] args) {

        port(8080);
        staticFiles.location("/public");

        Spark.post("/login", LogInHandler::handle);
        Spark.post("/registration", RegistrationHandler::handle);
    }
}
