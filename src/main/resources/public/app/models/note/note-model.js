import NoteContentFactory from './note-content/note-content-factory.js';
import Tag from './tag.js';

export default class NoteModel {

  /**
   * @type {string}
   */
  id;

  /**
   * @type {string}
   */
  name;

  /**
   * Note contents.
   * @type {NoteContent[]}
   */
  contents;

  /**
   * Tag, associated with model.
   * @type {Tag}
   */
  tag;

  constructor(noteObject) {
    const contentFactory = new NoteContentFactory();
    Object.assign(this, noteObject, {
      contents: noteObject.contents.map((contentObject) => contentFactory.create(contentObject)),
    }, {
      tag: new Tag(noteObject.tag),
    });
  }
}
