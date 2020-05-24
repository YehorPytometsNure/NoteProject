import Action from './action.js';
import PreviouslyVisitedTagsLoadingMutator from '../mutators/previously-visited-tags-loading-mutator.js';
import PreviouslyVisitedTagsMutator from '../mutators/previously-visited-tags-mutator.js';
import PreviouslyVisitedTagsLoadingErrorMutator from '../mutators/previously-visited-tags-loading-error-mutator.js';

export default class GetPreviouslyVisitedTagsAction extends Action {

  async apply(stateManager) {
    stateManager.mutate(new PreviouslyVisitedTagsLoadingMutator(true));
    return stateManager.apiService.getPreviouslyVisitedTags()
      .then((tags) => stateManager.mutate(new PreviouslyVisitedTagsMutator(tags)))
      .catch((error) => stateManager.mutate(new PreviouslyVisitedTagsLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new PreviouslyVisitedTagsLoadingMutator(false)));
  }
}
