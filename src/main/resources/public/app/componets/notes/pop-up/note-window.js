import Component from '../../component.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NoteWindow extends Component {

  _note = {};

  _initComponent() {
    super._initComponent();
    this.hide();
    this._onAcceptCreatingHandlers = new EventHandlersStorage();
    this._onAcceptEditingHandlers = new EventHandlersStorage();
    this._onDeleteButtonClickHandlers = new EventHandlersStorage();
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
                    <img class="button10" src="././././images/paint.png" data-type="delete-button">
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
      const headerContent = header.value;

      const windowText = this.rootElement.querySelector('[data-type="note-window-text"]');
      const windowTextContent = windowText.textContent;

      const noteObjectToSend = Object.assign(this._note, {
        name: headerContent,
        content: [
          {
            type: 'text',
            data: windowTextContent,
          },
        ],
      });

      if (this._editingMode) {
        this._onAcceptEditingHandlers.executeHandlers(noteObjectToSend);
        return;
      }

      this._onAcceptCreatingHandlers.executeHandlers(noteObjectToSend);
    });

    const deleteButton = this.rootElement.querySelector('[data-type="delete-button"]');
    deleteButton.addEventListener('click', () => {

      if (this._editingMode) {
        this._onDeleteButtonClickHandlers.executeHandlers(this._note);
      }
    });
  }

  creatingMode() {
    this._creatingMode = true;
    this._editingMode = false;
    this.rootElement.style.display = "block";
  }

  editingMode() {
    this._creatingMode = false;
    this._editingMode = true;
    this.rootElement.style.display = "block";
  }

  hide() {
    this.rootElement.style.display = "none";
    this.rootElement.querySelector('[data-type="note-window-header"]').value = '';
    this.rootElement.querySelector('[data-type="note-window-text"]').textContent = '';
  }

  onAcceptCreating(handler) {
    this._onAcceptCreatingHandlers.addEventHandler(handler);
  }

  onAcceptEditing(handler) {
    this._onAcceptEditingHandlers.addEventHandler(handler);
  }

  onDeleteButtonClick(handler) {
    this._onDeleteButtonClickHandlers.addEventHandler(handler);
  }

  set note(note) {
    this._note = Object.assign({}, note);
    this._header = note.name;
    this._contents = note.contents;
  }

  set _header(header) {
    this.rootElement.querySelector('[data-type="note-window-header"]').value = header;
  }

  set _contents(contents) {
    // TODO: think of rendering different types of data.
    contents.forEach(({type, data}) => {
      if (type === "text") {
        this.rootElement.querySelector('[data-type="note-window-text"]').textContent += data;
      }
    })
  }
}
