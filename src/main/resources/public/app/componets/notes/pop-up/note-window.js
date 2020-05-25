import Component from '../../component.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NoteWindow extends Component {

  _initComponent() {
    super._initComponent();
    this.hide();
    this._onAcceptHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div class="module_window" data-type="note-window">
            <img src="././././images/menu-mascot/resting.png" class="module-window-seal"/>
            <div class="head_module">
                <input class="name_module" type="text" value="Name this" maxlength="9" data-type="note-window-header">
                <img class="button1" src="././././images/close.png" alt="close">
            </div>
            <textarea class="text_module" data-type="note-window-text">Write your text here...</textarea>
            <div class="footer_module">
                <div class="images1">
                    <img class="button2" src="././././images/goru.jpg">
                    <img class="button3" src="././././images/micro.png">
                    <img class="button4" src="././././images/planner.png">
                    <img class="button5" src="././././images/calendar.png">
                    <img class="button6" src="././././images/paint.png">
                </div>
                <div class="images2">
                    <img class="button7" src="././././images/network.png">
                    <img class="button8" src="././././images/mail.png">
                    <img class="button9" src="././././images/ok.png" data-type="ok-button">
                </div>
            </div>
        </div>
    `;
  }

  _addEventListeners() {
    super._addEventListeners();

    const okButton = this.rootElement.querySelector('[data-type="ok-button"]');
    okButton.addEventListener('click', (event) => {
      const header = this.rootElement.querySelector('[data-type="note-window-header"]');
      const headerContent = header.textContent;

      const windowText = this.rootElement.querySelector('[data-type="note-window-text"]');
      const windowTextContent = windowText.textContent;

      const content = {
        header: headerContent,
        content: [
          {
            type: 'text',
            data: windowTextContent,
          },
        ],
      };

      this._onAcceptHandlers.executeHandlers(content);
    });
  }

  show() {
    this.rootElement.style.display = "block";
  }

  hide() {
    this.rootElement.style.display = "none";
  }

  onAccept(handler) {
    this._onAcceptHandlers.addEventHandler(handler);
  }
}
