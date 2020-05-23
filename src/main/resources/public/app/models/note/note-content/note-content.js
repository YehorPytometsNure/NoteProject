export default class NoteContent {

  /**
   * Note's content.
   * @type {*}
   * @private
   */
  _data;

  /**
   * Instantiates NoteContent.
   *
   * @param {*} data - data of Note Content.
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * Getter for data.
   *
   * @return {*} returned content.
   */
  get data() {
    return this._data;
  }
}
