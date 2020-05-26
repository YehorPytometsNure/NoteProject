import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';

export default class UpdateNoteAction extends Action {

  _noteObject;

  constructor(noteObject) {
    super();
    this._noteObject = noteObject;
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));

    return stateManager.apiService.updateNote(this._noteObject)
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
