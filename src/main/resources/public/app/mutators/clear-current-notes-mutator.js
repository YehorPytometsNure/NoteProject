import Mutator from './mutator.js';

export default class ClearCurrentNotesMutator extends Mutator {

  apply(state) {
    state.currentNotes.clear();
    state.currentNotes = state.currentNotes;
  }
}
