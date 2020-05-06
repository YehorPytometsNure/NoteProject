import Component from '../component.js';

/**
 * Component for rendering form element.
 * @abstract
 */
export default class Form extends Component {

  /**
   * Instantiates Form component.
   *
   * @param {HTMLElement} container - parent container.
   * @param {object} properties - configuration properties of the component.
   * @param {FormValidator} properties.formValidator - form delegates validation to formValidator.
   */
  constructor(container, {formValidator} = {}) {
    super(container, {formValidator});
  }

  /**
   * @name SubmitEventHandler
   * @function
   * @param {ValidationUnit[]} - array of field-input pairs.
   */

  /**
   * Handlers for click event.
   *
   * @type {SubmitEventHandler[]}
   * @private
   */
  _onSubmitHandlers = [];

  /**
   * @inheritdoc
   */
  _addEventListeners() {
    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._validateForm();
    });
  }

  /**
   * Validates form and handles validation result.
   * @private
   */
  _validateForm() {
    const validationUnits = this._collectValidationUnits();
    this._hideErrorMessages();

    this.properties.formValidator.validate(validationUnits)
      .then(() => {
        this._handleSubmitEvent();
      })
      .catch((errorCase) => {
        this._resolveValidationFailure([errorCase]);
      });
  }

  /**
   * Collects input data from form and transforms it into an object, containing ValidationUnits.
   *
   * @return {Object.<string, ValidationUnit>} collected validation units.
   * @abstract
   * @private
   */
  _collectValidationUnits() {

  }

  /**
   * Hides error messages on the form input components.
   */
  hideErrorMessages() {
    this.inputComponents.forEach((component) => component.hideErrorMessage());
  }

  /**
   * Adds handler for form's submit event.
   *
   * @param {SubmitEventHandler} handler - function will execute when 'submit' event of the form triggers.
   */
  onSubmit(handler) {
    this._onSubmitHandlers.push(handler);
  }

  /**
   * Executes submit event handlers.
   * @private
   */
  _handleSubmitEvent() {
    this._onSubmitHandlers.forEach((handler) => handler());
  }

  /**
   * Handles validation error case.
   *
   * @param {ValidationErrorCase[]} errorCases - field-message pairs, containing descriptive info about errors.
   */
  resolveValidationFailure(errorCases) {
    this.inputComponents.forEach((component) => {
      const {inputName} = component;
      const errorCase = errorCases.find((errorCase) => errorCase.field === inputName);

      if (errorCase) {
        component.showErrorMessage(errorCase.message);
      }
    });
  }

  /**
   * Resolves authentication error.
   *
   * @param {AuthenticationError} error - authentication error.
   */
  showAuthenticationError(error) {
    this.inputComponents[0].showErrorMessage(error.message);
  }
}
