import Input from '../input.js';
import RegistrationFormValidator from './registration-form-validator.js';
import ValidationUnit from '../../../models/validation-unit.js';
import Form from '../form.js';
import FishAnchor from '../fish-anchor.js';

export default class RegistrationForm extends Form {

  /**
   * Instantiates RegistrationForm component.
   *
   * @param {HTMLElement} container - parent container.
   * @param {object} properties - configuration properties of the component.
   * @param {FormValidator} properties.formValidator - form delegates validation to formValidator.
   */
  constructor(container, {formValidator = new RegistrationFormValidator()} = {}) {
    super(container, {formValidator});
  }

  _markup() {
    return `
      <form class="left side" data-type="registration-form" data-test="registration-form-rendered">
        <div class="form-header">Are you ready to sign up?</div>
      </form>
    `;
  }

  _initNestedComponents() {
    const {rootElement} = this;

    this.loginComponent = new Input(rootElement, {
      inputAttributeId: 'email-input',
      labelTextContent: 'Login:',
      inputAttributeType: 'email',
      inputName: 'login',
    });

    this.passwordComponent = new Input(rootElement, {
      inputAttributeId: 'password-input',
      labelTextContent: 'Password:',
      inputAttributeType: 'password',
      inputName: 'password',
    });

    this.confirmPasswordComponent = new Input(rootElement, {
      inputAttributeId: 'confirm-password-input',
      labelTextContent: 'Confirm Password: ',
      inputAttributeType: 'password',
      inputName: 'confirmPassword',
    });

    this.inputComponents = [this.loginComponent, this.passwordComponent, this.confirmPasswordComponent];

    this.submitButton = new FishAnchor(rootElement, {
      textContent: 'Sign Up',
    });
  }

  /**
   * @inheritdoc
   */
  _collectValidationUnits() {
    const {loginComponent, passwordComponent, confirmPasswordComponent} = this;

    return {
      [loginComponent.inputName]: new ValidationUnit(loginComponent),
      [passwordComponent.inputName]: new ValidationUnit(passwordComponent),
      [confirmPasswordComponent.inputName]: new ValidationUnit(confirmPasswordComponent),
    };
  }
}
