package ua.nure.sealthenote.server;

public enum StatusCode {

    OK(200),
    AUTHENTICATION_ERROR(401),
    NOT_FOUND_ERROR(404),
    VALIDATION_ERROR(422),
    INTERNAL_SERVER_ERROR(500);

    private final int statusCode;

    StatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public int value() {
        return statusCode;
    }
}
