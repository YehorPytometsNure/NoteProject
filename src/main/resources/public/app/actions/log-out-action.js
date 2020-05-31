import Action from './action.js';

export default class LogOutAction extends Action {

  constructor() {
    super();
  }

  async apply(stateManager) {
    return stateManager.apiService.logOut();
  }
}
