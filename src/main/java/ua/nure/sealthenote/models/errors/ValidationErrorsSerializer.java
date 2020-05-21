package ua.nure.sealthenote.models.errors;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.Arrays;

public class ValidationErrorsSerializer implements JsonSerializer<ValidationError[]> {

    @Override
    public JsonElement serialize(ValidationError[] errorModels, Type typeOfSrc, JsonSerializationContext context) {

        JsonArray errorsJson = new JsonArray();

        Arrays.stream(errorModels)
                .map((errorModel) -> {
                    JsonObject errorJson = new JsonObject();
                    errorJson.addProperty("field", errorModel.fieldName());
                    errorJson.addProperty("message", errorModel.errorMessage());

                    return errorJson;
                })
                .forEach(errorsJson::add);

        JsonObject wrapper = new JsonObject();
        wrapper.add("validationErrors", errorsJson);

        return wrapper;
    }
}
