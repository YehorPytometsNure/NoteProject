import Component from '../component.js';
import NotesGroup from './notes-group.js';
import EventHandlersStorage from '../../event/event-handlers-storage.js';

export default class NotesGrid extends Component {

  _markup() {
    return `
        <div data-type="notes-grid"></div>
    `;
  }

  _initComponent() {
    super._initComponent();
    this._onNoteClickedHandlers = new EventHandlersStorage();
    this._onBinDeleteClickHandlers = new EventHandlersStorage();
    this._onDeleteButtonClickHandlers = new EventHandlersStorage();
    this._onPadlockClickhandlers = new EventHandlersStorage();
  }

  /**
   *
   * @param {Map<Tag, NoteModel[]>} notesMap
   * @param {string} sortOrder
   */
  renderNotesMap(notesMap, sortOrder = '') {
    const {rootElement} = this;

    //TODO: think of when to clear and when not to clear notes.
    rootElement.innerHTML = '';

    let notesArray = Array.from(notesMap);
    if (sortOrder === 'tag') {
      notesArray.sort(([tag1], [tag2]) => {

        if (tag1.name < tag2.name) {
          return -1;
        }

        if (tag1.name > tag2.name) {
          return 1;
        }

        return 0;
      });
    } else if (sortOrder === 'name') {
      notesArray.forEach(([tag, notes]) => {
        notes.sort((note1, note2) => {

          if (note1.name < note2.name) {
            return -1;
          }

          if (note1.name > note2.name) {
            return 1;
          }

          return 0;
        });
      });
    }

    notesArray.forEach(([tag, notes]) => {
      const component = new NotesGroup(rootElement, {tag, notes});

      component.onGroupItemClick((note) => {
        this._onNoteClickedHandlers.executeHandlers(note);
      });

      component.onBinDeleteClick((notes) => {
        this._onBinDeleteClickHandlers.executeHandlers(notes);
      });

      component.onDeleteButtonClick((note) => {
        this._onDeleteButtonClickHandlers.executeHandlers(note);
      });

      component.onPadlockClick((note) => {
        this._onPadlockClickhandlers.executeHandlers(note);
      });
    });
  }

  onItemSelected(handler) {
    this._onNoteClickedHandlers.addEventHandler(handler);
  }

  onBinDeleteClick(handler) {
    this._onBinDeleteClickHandlers.addEventHandler(handler);
  }

  onDeleteButtonClick(handler) {
    this._onDeleteButtonClickHandlers.addEventHandler(handler);
  }

  onPadlockClick(handler) {
    this._onPadlockClickhandlers.addEventHandler(handler);
  }
}
