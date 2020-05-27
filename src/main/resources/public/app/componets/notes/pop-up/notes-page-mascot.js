import Component from '../../component.js';

export default class NotesPageMascot extends Component {

  _markup() {
    return `
        <div class="mascot-container" data-type="note-page-mascot">
            <div class="message-bubble" data-type="mascot-message"></div>
            <img src="././././images/menu-mascot/tutorial.png" class="tutorial-seal" alt="mascot"/>
        </div>
    `;
  }

  showMessage(message) {
    this.rootElement.querySelector('[data-type="mascot-message"]').textContent = message;
    this.rootElement.querySelector('[data-type="mascot-message"]').style.display = 'block';
  }

  hideMessage() {
    this.rootElement.querySelector('[data-type="mascot-message"]').style.display = 'none';
    this.rootElement.querySelector('[data-type="mascot-message"]').textContent = '';
  }

  displayMascot() {
    this.rootElement.style.display = 'block';
  }

  hideMascot() {
    this.rootElement.style.display = 'none';
  }
}
