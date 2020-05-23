import Component from '../component.js';

export default class NotesGrid extends Component {

  _markup() {
    return `
        <div data-type="notes-grid">
            <div class="name_tag">
                <p data-type="notes-grid-tag-name"></p>
            </div>
            <div class="tag" data-type="notes-grid-notes-container">
            </div>
        </div>
    `;
  }
}
