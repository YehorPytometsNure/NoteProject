import Component from '../component.js';

/**
 * Components for displaying error messages on login and registration forms.
 */
export default class ErrorMessageBubble extends Component {

  /**
   * Instantiates ErrorMessageBubble.
   *
   * @param {HTMLElement} container - parent container.
   */
  constructor(container) {
    super(container);
  }

  /**
   * @inheritdoc
   */
  _markup() {
    return `
      <div data-type="message-bubble"></div>
    `;
  }

  /**
   * Shows bubble with error message.
   *
   * @param {string} message - error message.
   */
  showErrorMessage(message) {
    this.rootElement.classList.add('message-bubble');
    this.rootElement.textContent = message;
  }

  /**
   * Hides error message.
   */
  hideErrorMessage() {
    this.rootElement.classList.remove('message-bubble');
    this.rootElement.textContent = '';
  }
}
