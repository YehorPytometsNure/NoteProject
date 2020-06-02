import Component from '../component.js';
import NoteContentText from '../../models/note/note-content/note-content-text.js';
import NoteContentTextComponent from './notes-content/note-content-text-component.js';
import EventHandlersStorage from '../../event/event-handlers-storage.js';

export default class NotesGroupItem extends Component {

  /**
   *
   * @param container
   * @param {NoteModel} note
   */
  constructor(container, {note}) {
    super(container, {note});
  }

  _initComponent() {
    super._initComponent();
    this._onItemClickHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div class="note_tag">
            <div class="name_note_tag" data-type="note-name">${this.note.name}</div>
            <div class="ex_note ${this.note.password ? 'passworded' : ''}" data-type="note-content"></div>
            <img src="images/padlock.png" class="padlock" alt="padlock">
            <img src="images/close.png" class="delete-note" alt="close">
        </div>
    `;
  }

  _initNestedComponents() {
    const {contents} = this.note;
    const contentsContainer = this.rootElement.querySelector('[data-type="note-content"]');

    contents.forEach((content) => {

      if (content instanceof NoteContentText) {
        new NoteContentTextComponent(contentsContainer, {content});

        return;
      }

      throw new TypeError("No component for such content type.");
    });
  }

  _addEventListeners() {
    super._addEventListeners();

    this.rootElement.addEventListener('click', () => {
      this._onItemClickHandlers.executeHandlers();
    });
  }

  onItemClick(handler) {
    this._onItemClickHandlers.addEventHandler(handler);
  }
}
