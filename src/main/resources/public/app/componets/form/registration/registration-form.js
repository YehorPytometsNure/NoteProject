import Input from '../input.js';
import Anchor from '../anchor.js';
import RegistrationFormValidator from './registration-form-validator.js';
import ValidationUnit from '../../../models/validation-unit.js';
import Form from '../form.js';

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
      <form class="left side registration" data-type="registration-form" data-test="registration-form-rendered">
        <div class="header">Hello! Are you ready to sign up?</div>
      </form>
    `;
  }

  _initNestedComponents() {
    const {rootElement} = this;

    this.loginComponent = new Input(rootElement, {
      inputAttributeId: 'email-input',
      labelTextContent: 'Email:',
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

    this.submitButton = new Anchor(rootElement, {
      textContent: 'Register',
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
