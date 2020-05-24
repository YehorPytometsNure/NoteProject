import Mutator from './mutator.js';
import Tag from '../models/note/tag.js';

export default class PreviouslyVisitedTagsMutator extends Mutator {

  _tagObjects

  constructor(tagObjects) {
    super();
    this._tagObjects = tagObjects;
  }

  apply(state) {
    state.previouslyVisitedTags = this._tagObjects.tags.map((tagObject) => new Tag(tagObject));
  }
}
