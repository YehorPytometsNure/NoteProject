import Action from './action.js';
import CurrentNotesLoadingMutator from '../mutators/current-notes-loading-mutator.js';
import CurrentNotesLoadingErrorMutator from '../mutators/current-notes-loading-error-mutator.js';

export default class UploadUserAction extends Action {

  _user;

  constructor(user) {
    super();
    this._user = user;
  }

  async apply(stateManager) {

    stateManager.mutate(new CurrentNotesLoadingMutator(true));

    return stateManager.apiService.uploadUser(this._user)
      .catch((error) => stateManager.mutate(new CurrentNotesLoadingErrorMutator(error)))
      .finally(() => stateManager.mutate(new CurrentNotesLoadingMutator(false)));
  }
}
