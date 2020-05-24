/**
 * @abstract
 */
export default class NoteContent {

  /**
   * Note's content type.
   * @type {string}
   */
  type

  /**
   * Note's content.
   * @type {*}
   */
  data;

  /**
   * Instantiates NoteContent.
   *
   * @param {object} content - note's content.
   * @param {*} content.data - data of Note Content.
   * @param {string} content.type - type of note's content.
   */
  constructor(content) {
    Object.assign(this, content);
  }
}
