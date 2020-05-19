package ua.nure.sealthenote.models.errors;

public class ValidationError {

    private final String fieldName;
    private final String errorMessage;

    public ValidationError(String fieldName, String errorMessage) {

        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }

    public String fieldName() {
        return fieldName;
    }

    public String errorMessage() {
        return errorMessage;
    }
}
