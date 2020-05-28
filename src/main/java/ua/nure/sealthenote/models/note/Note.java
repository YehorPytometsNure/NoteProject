package ua.nure.sealthenote.models.note;

import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.tag.Tag;

public class Note {

    private final String id;
    private final String name;
    private final Tag tag;
    private final NoteContent[] contents;
    private String password;

    public Note(String id, String name, Tag tag, NoteContent[] contents, String password) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.contents = contents;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Tag getTag() {
        return tag;
    }

    public NoteContent[] getContents() {
        return contents;
    }

    public String getPassword() {
        return password;
    }
}
