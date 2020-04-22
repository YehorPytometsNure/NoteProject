/**
 * Value object, containing login;
 */
export default class Login {

    /**
     * User login.
     * @type{string}.
     * @readonly
     */
    value;

    /**
     * Instantiates login.
     *
     * @param login
     */
    constructor(login) {
        this.value = login;
        Object.freeze(this);
    }
}
