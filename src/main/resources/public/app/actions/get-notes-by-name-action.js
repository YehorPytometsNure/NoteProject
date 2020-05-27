import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import AddCurrentNotesMutator from '../mutators/add-current-notes-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';
import Tag from '../models/note/tag.js';
import ClearCurrentNotesMutator from '../mutators/clear-current-notes-mutator.js';

export default class GetNotesByNameAction extends Action {

  _name;

  constructor(name) {
    super();
    this._name = name;
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));
    return stateManager.apiService.getNotesByName(this._name)
      .then((notes) => {
          stateManager.mutate(new ClearCurrentNotesMutator());
          stateManager.mutate(new AddCurrentNotesMutator(new Tag({
            id: '0',
            name: `Name: ${this._name}`,
          }), notes));
        },
      )
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
