/**
 * Value object, containing user credentials.
 */
export default class UserCredentials {

  /**
   * User login.
   * @type {Login}.
   * @readonly
   */
  login;

  /**
   * User password.
   * @type {Password}.
   * @readonly
   */
  password;

  /**
   * Instantiates UserCredentials value object.
   *
   * @param {Login} login - user login.
   * @param {Password} password - password.
   */
  constructor(login, password) {
    this.login = login;
    this.password = password;
    Object.freeze(this);
  }
}
