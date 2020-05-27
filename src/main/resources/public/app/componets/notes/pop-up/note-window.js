import Component from '../../component.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NoteWindow extends Component {

  _note = {};

  _initComponent() {
    super._initComponent();
    this.hide();
    this._isRecognizing = false;
    this._onAcceptCreatingHandlers = new EventHandlersStorage();
    this._onAcceptEditingHandlers = new EventHandlersStorage();
    this._onDeleteButtonClickHandlers = new EventHandlersStorage();
    this._onStartRecognizingHandlers = new EventHandlersStorage();
    this._onRecognizingPauseHandlers = new EventHandlersStorage();
    this._onRecognizingStopHandlers = new EventHandlersStorage();
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
                    <img class="button3" src="././././images/micro.png" data-type="micro-button">
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

    const microButton = this.rootElement.querySelector('[data-type="micro-button"]');
    microButton.addEventListener('click', () => {

      this._isRecognizing = !this._isRecognizing;

      if (!this._isRecognizing) {
        return;
      }

      const windowText = this.rootElement.querySelector('[data-type="note-window-text"]');
      const recognition = new (SpeechRecognition || webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.lang = 'en-US';
      // recognition.lang = 'uk-UA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      let result = '';

      const assertResult = () => {
        if (result.trim().toLowerCase() === 'stop' || result.trim().toLowerCase() === 'стоп' || !this._isRecognizing) {
          recognition.abort();
          return false;
        }

        return true;
      }

      function retrieveCommand(input) {
        switch (input) {
          case 'newline':
          case 'new-line':
          case 'new line':
          case 'новий рядок':
          case 'нью лайн':
          case 'нова лінія':
            {
            return '\n';
          }
          case 'dot':
          case 'point':
          case 'крапка':
            {
            return '.';
          }
          default: {
            return null;
          }
        }
      }

      recognition.addEventListener('result', (event) => {
        result = event.results[0][0].transcript;
        console.log(event);
        console.log(result);

        if (!assertResult()) {
          return;
        }

        const command = retrieveCommand(result.trim().toLowerCase());

        if (command) {
          windowText.textContent += command;
        } else {
          windowText.textContent += result;
        }
      });

      recognition.addEventListener('end', (event) => {
        console.log(event);
        if (!assertResult()) {
          this._isRecognizing = false;
          this._onRecognizingStopHandlers.executeHandlers();
        } else {
          recognition.start();
        }
      });

      recognition.addEventListener('audiostart', (event) => {
        console.log(event);

        if (assertResult()) {
          this._onStartRecognizingHandlers.executeHandlers();
        }
      });

      recognition.addEventListener('audioend', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('error', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('nomatch', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('soundstart', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('soundend', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('speechstart', (event) => {
        console.log(event);
        assertResult();
      });

      recognition.addEventListener('speechend', (event) => {
        console.log(event);

        if (assertResult()) {
          this._onRecognizingPauseHandlers.executeHandlers();
        }
      });

      recognition.start();
    });
  }

  creatingMode() {
    this._creatingMode = true;
    this._editingMode = false;
    this.rootElement.style.display = 'block';
  }

  editingMode() {
    this._creatingMode = false;
    this._editingMode = true;
    this.rootElement.style.display = 'block';
  }

  hide() {
    this.rootElement.style.display = 'none';
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

  onRecognizingStart(handler) {
    this._onStartRecognizingHandlers.addEventHandler(handler);
  }
  onRecognizingPause(handler) {
    this._onRecognizingPauseHandlers.addEventHandler(handler);
  }
  onRecognizingStop(handler) {
    this._onRecognizingStopHandlers.addEventHandler(handler);
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
      if (type === 'text') {
        this.rootElement.querySelector('[data-type="note-window-text"]').textContent += data;
      }
    });
  }
}
