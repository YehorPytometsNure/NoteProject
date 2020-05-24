import Mutator from './mutator.js';

export default class PreviouslyVisitedTagsLoadingErrorMutator extends Mutator {

  _error;

  constructor(error) {
    super();
    this._error = error;
  }

  apply(state) {
    state.previouslyVisitedTagsLoadingError = this._error;
  }
}
