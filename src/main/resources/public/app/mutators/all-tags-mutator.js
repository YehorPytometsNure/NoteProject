import Mutator from './mutator.js';
import Tag from '../models/note/tag.js';

export default class AllTagsMutator extends Mutator {

  _tagObjects;

  constructor(tags) {
    super();
    this._tagObjects = tags;
  }

  apply(state) {
    state.allTags = this._tagObjects.tags.map((tagObject) => new Tag(tagObject)).filter((tag) => tag.id !== 'bin');
  }
}
