import Component from '../../component.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NavigationMenuTag extends Component {

  constructor(container, {tag}) {
    super(container, {tag});
  }

  _initComponent() {
    super._initComponent();
    this._onClickHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <p class="slide_menu_item">${this.tag.name}</p>
    `;
  }

  _initNestedComponents() {
    super._initNestedComponents();

    this.rootElement.addEventListener('click', () => {
      this._onClickHandlers.executeHandlers(this.tag);
    });
  }

  onClick(handler) {
    this._onClickHandlers.addEventHandler(handler);
  }
}
