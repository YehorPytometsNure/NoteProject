package ua.nure.sealthenote.models.note.tag;

public class Tag {

    private final String id;
    private final String name;

    public Tag(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }
}

