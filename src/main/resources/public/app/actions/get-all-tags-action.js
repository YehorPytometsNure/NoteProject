import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import AllTagsMutator from '../mutators/all-tags-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';

export default class GetAllTagsAction extends Action {

  async apply(stateManager) {
    stateManager.mutate(new CurrentNotesLoadingMutator(true));

    return stateManager.apiService.getAllTags()
      .then((tags) => stateManager.mutate(new AllTagsMutator(tags)))
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
