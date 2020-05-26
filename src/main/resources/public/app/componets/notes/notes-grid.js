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
  }

  /**
   *
   * @param {Map<Tag, NoteModel[]>} notesMap
   */
  renderNotesMap(notesMap) {
    const {rootElement} = this;

    rootElement.innerHTML = '';

    notesMap.forEach((notes, tag) => {
      const component = new NotesGroup(rootElement, {tag, notes});

      component.onGroupItemClick((note) => {
        this._onNoteClickedHandlers.executeHandlers(note);
      });
    });
  }

  onItemSelected(handler) {
    this._onNoteClickedHandlers.addEventHandler(handler);
  }
}
