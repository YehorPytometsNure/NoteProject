import Mutator from './mutator.js';

export default class PreviouslyVisitedTagsLoadingMutator extends Mutator {

  _isLoading;

  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  apply(state) {
    state.arePreviouslyVisitedTagsLoading = this._isLoading;
  }
}
