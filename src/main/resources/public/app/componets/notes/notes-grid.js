import Component from '../component.js';
import NotesGroup from './notes-group.js';

export default class NotesGrid extends Component {

  _markup() {
    return `
        <div data-type="notes-grid"></div>
    `;
  }

  /**
   *
   * @param {Map<Tag, NoteModel[]>} notesMap
   */
  renderNotesMap(notesMap) {
    const {rootElement} = this;

    rootElement.innerHTML = '';

    notesMap.forEach((notes, tag) => {
      new NotesGroup(rootElement, {tag, notes});
    })
  }
}
