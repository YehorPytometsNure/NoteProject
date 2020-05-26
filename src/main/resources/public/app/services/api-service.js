import AuthenticationError from '../models/errors/authentication-error.js';
import ServerValidationError from '../models/errors/server-validation-error.js';
import GeneralServerError from '../models/errors/general-server-error.js';
import ResourceNotFoundError from '../models/errors/resource-not-found-error.js';

/**
 * Contains methods that send requests to server.
 * Responsible for establishing connection with server.
 *
 * 400 - general client error.
 * 401 - authentication error.
 * 422 - validation error.
 * 500 - general server error.
 */
export default class ApiService {

  /**
   * Instantiates ApiService.
   *
   * @param {TokenService} tokenService - token service for retrieving current session token.
   */
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  /**
   * Makes login request on server.
   *
   * @param {UserCredentials} userCredentials - login and password.
   * @return {Promise} resolving promise in case of successful login or rejected promise
   * with error description.
   */
  async logIn(userCredentials) {
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse)
      .then((response) => response.json())
      .then(({token}) => this.tokenService.setToken(token));
  }

  /**
   * Makes registration request on server.
   *
   * @param {UserCredentials} userCredentials - login and password.
   * @return {Promise} resolving promise in case of successful registration or
   * rejected promise with error description.
   */
  async register(userCredentials) {
    return fetch('/registration', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse);
  }

  /**
   * Retrieves notes mapped to a tag from the server.
   *
   * @param {string} tagId - retrieve notes by that tag id.
   * @return {Promise} - promise, resolved for client processing.
   */
  async getNotes(tagId) {
    return fetch(`/notes/${tagId}/content`, this._createInitObject())
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse)
      .then((response) => response.json());
  }

  /**
   * Makes fetch request to retrieve last-visited tags meta data.
   *
   * @return {Promise} - resulting promise wrapping previously visited tags meta data.
   */
  async getPreviouslyVisitedTags() {
    return fetch('/tags/previous', this._createInitObject())
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse)
      .then((response) => response.json());
  }

  async createNote(noteObject) {
    return fetch('/note', {
      method: 'POST',
      body: JSON.stringify(noteObject),
      headers: {
        Authorization: this._getBearerAccessToken(),
      },
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse);
  }

  async updateNote(noteObject) {
    return fetch(`/note/${noteObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(noteObject),
      headers: {
        Authorization: this._getBearerAccessToken(),
      },
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse);
  }

  async deleteNote(noteObject) {
    return fetch(`/note/${noteObject.id}`, {
      method: 'DELETE',
      body: JSON.stringify(noteObject),
      headers: {
        Authorization: this._getBearerAccessToken(),
      },
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse);
  }

  async getAllTags() {
    return fetch('/tags/all', this._createInitObject())
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse)
      .then((response) => response.json());
  }

  async createTag(name) {
    return fetch('/tag', {
      method: 'POST',
      body: name,
      headers: {
        Authorization: this._getBearerAccessToken(),
      },
    })
      .catch((networkError) => {
        console.error(`Network error: ${networkError}.`);
      })
      .then(this._validateResponse);
  }

  /**
   * Validates response status code.
   *
   * @param {Response} response - fetch response.
   * @return {Promise<Response>} - resolved promise.
   * @throws {Error}.
   * @private
   */
  async _validateResponse(response) {
    const {status} = response;

    if (status === 200) {
      return response;
    }

    const internalServerErrorCode = 500;
    const errorCallbacks = {
      401: async () => {
        const message = await response.text();
        return new AuthenticationError(message);
      },
      404: async () => {
        const message = await response.text();
        return new ResourceNotFoundError(message);
      },
      422: async () => {
        const erroneousJson = await response.json();
        return new ServerValidationError(erroneousJson);
      },
      [internalServerErrorCode]: () => new GeneralServerError(),
    };
    const error = errorCallbacks[status] || errorCallbacks[internalServerErrorCode];
    throw await error();
  }

  /**
   * Creates init object for folder requests.
   *
   * @return {RequestInit} - init object.
   * @private
   */
  _createInitObject() {
    return {
      method: 'GET',
      headers: {
        Authorization: this._getBearerAccessToken(),
      },
    };
  }

  /**
   * Constructs Bearer Access token.
   *
   * @return {string} - bearer access token.
   * @private
   */
  _getBearerAccessToken() {
    return `Bearer ${this.tokenService.getToken()}`;
  }
}
