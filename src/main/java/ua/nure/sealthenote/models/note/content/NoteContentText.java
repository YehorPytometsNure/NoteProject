package ua.nure.sealthenote.models.note.content;

public class NoteContentText implements NoteContent {

    private final String text;

    public NoteContentText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
