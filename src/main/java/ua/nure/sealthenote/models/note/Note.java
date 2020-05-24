package ua.nure.sealthenote.models.note;

import ua.nure.sealthenote.models.note.content.NoteContent;
import ua.nure.sealthenote.models.note.tag.Tag;

public class Note {

    private final String id;
    private final String name;
    private final Tag tag;
    private final NoteContent[] contents;

    public Note(String id, String name, Tag tag, NoteContent[] contents) {
        this.id = id;
        this.name = name;
        this.tag = tag;
        this.contents = contents;
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
}
