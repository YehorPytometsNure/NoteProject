package ua.nure.sealthenote.server.handlers;

import spark.Request;
import spark.Response;
import ua.nure.sealthenote.models.note.tag.Tag;
import ua.nure.sealthenote.models.token.Token;

import static ua.nure.sealthenote.server.StatusCode.AUTHENTICATION_ERROR;

public class CreateTagHandler {

    public static Object handle(Request request, Response response) {
        Token token = new Token(request.headers("Authorization"));

        if (!token.value().equals("Bearer access-token-mock")) {

            response.status(AUTHENTICATION_ERROR.value());

            return "Please, log in.";
        }

        String tagName = request.body();

        //TODO: save in db.
        Tag createdTag = new Tag("111", tagName);
        System.out.println("'created'");
        return 200;
    }
}
