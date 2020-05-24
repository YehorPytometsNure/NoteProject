import Mutator from './mutator.js';

export default class CurrentNotesLoadingErrorMutator extends Mutator {

  _error;

  constructor(error) {
    super();
    this._error = error;
  }

  apply(state) {
    state.currentNotesLoadingError = this._error;
  }
}
