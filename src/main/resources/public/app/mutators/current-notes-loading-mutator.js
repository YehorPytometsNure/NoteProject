import Mutator from './mutator.js';

export default class CurrentNotesLoadingMutator extends Mutator {

  _isLoading;

  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  apply(state) {
    state.areCurrentNotesLoading = this._isLoading;
  }
}
