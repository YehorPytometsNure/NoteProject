import Image from '../componets/image.js';
import RegistrationForm from '../componets/form/registration/registration-form.js';
import ErrorMessageBubble from '../componets/form/error-message-bubble.js';
import AbstractFormPage from './abstract-form-page.js';

export default class RegistrationPage extends AbstractFormPage {

  _initComponent() {
    super._initComponent();
    this.pageTitle = 'Registration';
  }

  _markup() {
    return `
      <div class="bottom side"> 
        <div class="content" data-type="registration-page-content">
          <div data-type="registration-page-form-container"></div>
          <div class="mascot-container" data-type="registration-page-bubble-container"></div>
        </div>  
      </div>
    `;
  }

  _initNestedComponents() {
    const formContainer = this.rootElement.querySelector('[data-type="registration-page-form-container"]');
    this.formComponent = new RegistrationForm(formContainer);

    const bubbleContainer = this.getBubbleContainer();
    new Image(bubbleContainer, {
      classNames: ['right', 'side'],
      src: 'images/tutorial.png',
      alternativeText: 'Mascot',
    });

    this.errorMessageBubble = new ErrorMessageBubble(bubbleContainer);
  }

  getBubbleContainer() {
    return this.rootElement.querySelector('[data-type="registration-page-bubble-container"]');
  }

  _makeRequest(userCredentials) {
    return this.apiService.register(userCredentials);
  }
}
