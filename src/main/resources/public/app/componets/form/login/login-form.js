import Input from '../input.js';
import Anchor from '../anchor.js';
import LoginFormValidator from './login-form-validator.js';
import ValidationUnit from '../../../models/validation-unit.js';
import Form from '../form.js';

export default class LoginForm extends Form {

  /**
   * Instantiates LoginForm component.
   *
   * @param {HTMLElement} container - parent container.
   * @param {object} properties - configuration properties of the component.
   * @param {FormValidator} properties.formValidator - form delegates validation to formValidator.
   */
  constructor(container, {formValidator = new LoginFormValidator()} = {}) {
    super(container, {formValidator});
  }

  _markup() {
    return `
      <form class="left side" data-type="login-form" data-test="login-form-rendered">
        <div class="form-header">Hello! Are you ready to log in?</div>
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

    this.inputComponents = [this.loginComponent, this.passwordComponent];

    this.submitButton = new Anchor(rootElement, {
      textContent: 'Log in',
    });
  }

  /**
   * @inheritdoc
   */
  _collectValidationUnits() {
    const {loginComponent, passwordComponent} = this;

    return {
      [loginComponent.inputName]: new ValidationUnit(loginComponent),
      [passwordComponent.inputName]: new ValidationUnit(passwordComponent),
    };
  }
}
