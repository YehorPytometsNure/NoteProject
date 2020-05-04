/**
 * Service makes fetch requests.
 * Service makes initial response processing.
 */
export default class ApiService {

    /**
     * Makes request to log user in.
     *
     * @param {UserCredentials} userCredentials - user credentials.
     */
    logIn(userCredentials) {
        const responsePromise = fetch('/login', {
            method: 'POST',
            body: JSON.stringify(userCredentials),
        });
    }
}
