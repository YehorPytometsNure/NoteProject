export default class UserModel {

  /**
   * @type {string}
   */
  id;

  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   * @example 2018-01-01.
   */
  birthDate;

  /**
   * @type {string}
   */
  email;

  /**
   * @type {string}
   */
  password;

  /**
   * @type {File|Blob}
   */
  avatar;

  constructor(userObject) {
    Object.assign(this, userObject);
  }
}
