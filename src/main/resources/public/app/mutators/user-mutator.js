import Mutator from './mutator.js';
import UserModel from '../models/user/user-model.js';

/**
 * Applies location value to state.
 */
export default class UserMutator extends Mutator {

  _user;

  /**
   * @param {object} user
   */
  constructor(user) {
    super();
    this._user = user;
  }

  /**
   * @inheritdoc
   */
  apply(state) {
    state.currentUser = new UserModel(this._user);
  }
}
