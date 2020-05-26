import Component from '../component.js';
import NotesGroupItem from './notes-group-item.js';
import EventHandlersStorage from '../../event/event-handlers-storage.js';

export default class NotesGroup extends Component {

  constructor(container, {tag, notes}) {
    super(container, {tag, notes});
  }

  _initComponent() {
    super._initComponent();
    this._onGroupItemClickHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div data-type="notes-group">
            <div class="name_tag">
                <p data-type="notes-group-tag-name">${this.tag.name}</p>
            </div>
            <div class="tag" data-type="notes-group-notes-container"></div>
        </div>
    `;
  }

  _initNestedComponents() {
    const {rootElement, notes} = this;
    const itemsContainer = rootElement.querySelector('[data-type="notes-group-notes-container"]');

    notes.forEach((note) => {
      const component = new NotesGroupItem(itemsContainer, {note});

      component.onItemClick(() => {
        this._onGroupItemClickHandlers.executeHandlers(note);
      });
    });
  }

  onGroupItemClick(handler) {
    this._onGroupItemClickHandlers.addEventHandler(handler);
  }
}
