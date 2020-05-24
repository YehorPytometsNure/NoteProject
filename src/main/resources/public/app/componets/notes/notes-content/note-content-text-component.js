import Component from '../../component.js';

/**
 * TODO: should extend abstract NoteContent component
 */
export default class NoteContentTextComponent extends Component {

  constructor(container, {content}) {
    super(container, {content});
  }

  _markup() {
    return `
        <p class="note-content-text" data-type="note-content-text">${this.content.data}</p>
    `;
  }
}
