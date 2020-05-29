import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';
import UserMutator from '../mutators/user-mutator.js';

export default class GetUserAction extends Action {

  constructor() {
    super();
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));
    return stateManager.apiService.getUser()
      .then((userObject) => stateManager.mutate(new UserMutator(userObject)))
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
