import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';

/**
 * Simulates server.
 * For development and testing purposes only.
 */
export default class FetchMockMode {

  _mockToken = 'admin-token';
  _adminToken = '';

  /**
   * Turns on fetch mock.
   */
  turnOn() {
    fetchMock.config.overwriteRoutes = true;
    window.localStorage.removeItem('accessToken');
    const validLogin = 'admin';
    const validPassword = 'qwerty123A';

    fetchMock.post('/login', (url, options) => {
      const data = JSON.parse(options.body);

      if (data.login.value !== validLogin) {
        return this._createAuthenticationError(`User with login ${data.login} doesn't exist. Please check your login or create your account.`,
          'login',
        );
      }

      if (data.password.value !== validPassword) {
        return this._createAuthenticationError('Wrong password.', 'password');
      }

      this._adminToken = this._mockToken;

      return this._createTokenResponse();
    });
  }

  /**
   * Creates object of authentication error.
   *
   * @param {string} message - error message.
   * @param {string} fieldName - erroneous field name.
   * @return {{body: {field: string, message: string}, status: number}} - authentication error response.
   * @private
   */
  _createAuthenticationError(message, fieldName = null) {
    return {
      body: {
        field: fieldName,
        message: message,
      },
      status: 401,
    };
  }

  /**
   * Creates object of token response.
   *
   * @return {{body: {token: string}, status: number}} token response.
   * @private
   */
  _createTokenResponse() {
    return {
      body: {
        token: this._adminToken,
      },
      status: 200,
    };
  }
}
