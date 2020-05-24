import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import AddCurrentNotesMutator from '../mutators/add-current-notes-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';

export default class GetNotesAction extends Action {

  _tag;

  constructor(tag) {
    super();
    this._tag = tag;
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));
    return stateManager.apiService.getNotes(this._tag.id)
      .then((notes) => stateManager.mutate(new AddCurrentNotesMutator(this._tag, notes)))
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
