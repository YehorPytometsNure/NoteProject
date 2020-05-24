import Mutator from './mutator.js';
import NoteModel from '../models/note/note-model.js';

export default class AddCurrentNotesMutator extends Mutator {

  _tag;
  _notesObjects;

  constructor(tag, notesObjects) {
    super();
    this._tag = tag;
    this._notesObjects = notesObjects;
  }

  apply(state) {
    state.currentNotes.set(this._tag, this._notesObjects.notes.map((note) => new NoteModel(note)));
    state.currentNotes = state.currentNotes;
  }
}
