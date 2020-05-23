export default class NoteModel {

  /**
   * @type {string}
   */
  _id;

  /**
   * @type {string}
   */
  _name;

  /**
   * Note contents.
   * @type {NoteContent[]}
   */
  _contents;

  /**
   * Tag, associated with model.
   * @type {Tag}
   */
  _tag;
}
