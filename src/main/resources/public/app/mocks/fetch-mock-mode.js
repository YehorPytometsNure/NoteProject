// import '../../../../../../node_modules/fetch-mock/cjs/client.js'
//TODO: think of not just commenting import, but rather disabling it.

/**
 * Simulates server.
 * For development and testing purposes only.
 */
class FetchMockMode {

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

      if (data.login !== validLogin || data.password !== validPassword) {
        return this._createAuthenticationError('Password or login is incorrect. Please, try again.');
      }

      this._adminToken = this._mockToken;

      return this._createTokenResponse();
    });

    fetchMock.post('/registration', (url, options) => {
      const data = JSON.parse(options.body);

      if (data.login === validLogin) {
        return {
          body: {
            validationErrors: [
              {
                field: 'login',
                message: `Login ${data.login} already exists. Please try a new one.`,
              },
            ],
          },
          status: 422,
        };
      }

      return 200;
    });
  }

  /**
   * Creates object of authentication error.
   *
   * @param {string} message - error message.
   * @return {{body: {message: *}, status: number}} - erroneous json.
   * @private
   */
  _createAuthenticationError(message) {
    return {
      body: message,
      status: 401,
    };
  }

  /**
   * Creates object of token response.
   *
   * @return {{token: string}}
   * @private
   */
  _createTokenResponse() {
    return {
      token: this._adminToken,
    };
  }
}

const fetchMockMode = new FetchMockMode();
export default fetchMockMode;
