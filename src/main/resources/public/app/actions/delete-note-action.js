import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';

export default class DeleteNoteAction extends Action {

  _noteObject;

  constructor(noteObject) {
    super();
    this._noteObject = noteObject;
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));

    return stateManager.apiService.deleteNote(this._noteObject)
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
