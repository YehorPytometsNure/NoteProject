import LoginForm from '../componets/form/login/login-form.js';
import Image from '../componets/form/image.js';
import ErrorMessageBubble from '../componets/form/error-message-bubble.js';
import AbstractFormPage from './abstract-form-page.js';

export default class LoginPage extends AbstractFormPage {

  _initComponent() {
    super._initComponent();
    this.pageTitle = 'Authentication';
  }

  _markup() {
    return `
      <div class="bottom side">
        <div class="content" data-type="login-page-content">
          <div data-type="login-page-form-container"></div>
          <div class="auth-mascot-container" data-type="login-page-bubble-container"></div>
        </div>
      </div>
    `;
  }

  _initNestedComponents() {
    const formContainer = this.rootElement.querySelector('[data-type="login-page-form-container"]');
    this.formComponent = new LoginForm(formContainer);

    const bubbleContainer = this.getBubbleContainer();
    new Image(bubbleContainer, {
      classNames: 'right side',
      src: 'images/tutorial.png',
      alternativeText: 'Mascot',
    });

    this.errorMessageBubble = new ErrorMessageBubble(bubbleContainer);
  }

  getBubbleContainer() {
    return this.rootElement.querySelector('[data-type="login-page-bubble-container"]');
  }

  _makeRequest(userCredentials) {
    return this.apiService.logIn(userCredentials);
  }
}
