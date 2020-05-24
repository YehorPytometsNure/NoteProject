import Component from '../component.js';
import NoteContentText from '../../models/note/note-content/note-content-text.js';
import NoteContentTextComponent from './notes-content/note-content-text-component.js';

export default class NotesGroupItem extends Component {

  /**
   *
   * @param container
   * @param {NoteModel} note
   */
  constructor(container, {note}) {
    super(container, {note});
  }

  _markup() {
    return `
        <div class="note_tag">
            <div class="name_note_tag" data-type="note-name">${this.note.name}</div>
            <div class="ex_note" data-type="note-content">
            </div>
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
}
