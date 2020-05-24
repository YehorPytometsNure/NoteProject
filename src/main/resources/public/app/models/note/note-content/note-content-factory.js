import NoteContentText from './note-content-text.js';

export default class NoteContentFactory {

  create(noteContentObject) {
    const map = {
      'text': NoteContentText,
    };

    const createContent = map[noteContentObject.type];

    if (createContent) {
      return new createContent(noteContentObject);
    }

    throw new TypeError(`Cannot create note content for a given type: ${noteContentObject.type}.`);
  }
}
