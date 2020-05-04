/**
 * Value object for password.
 */
export default class Password {

    /**
     * Password value.
     * @type {string}
     * @readonly
     */
    value

    /**
     * Instantiates Password value object.
     *
     * @param {string} password - user password.
     */
    constructor(password) {
        this.value = password;
        Object.freeze(this);
    }
}
