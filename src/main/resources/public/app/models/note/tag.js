export default class Tag {

  /**
   * @type {string}
   */
  id;

  /**
   * @type {string}
   */
  name;

  constructor({id, name}) {
    Object.assign(this, {id, name})
  }
}
