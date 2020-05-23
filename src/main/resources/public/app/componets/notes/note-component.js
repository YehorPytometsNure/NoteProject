import Component from '../component.js';

export default class NoteComponent extends Component {

  _markup() {
    return `
        <div class="note_tag">
            <div class="name_note_tag" data-type="note-name"></div>
            <div class="ex_note" data-type="note-content">
                <p data-type="note-content-text"></p>
            </div>
        </div>
    `;
  }
}
