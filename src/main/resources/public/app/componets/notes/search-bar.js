import Component from '../component.js';
import EventHandlersStorage from '../../event/event-handlers-storage.js';

export default class SearchBar extends Component {


  _initComponent() {
    super._initComponent();
    this._onInputSubmitHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <input class="input" type="text" placeholder="Type in to find a note...">
    `;
  }

  _addEventListeners() {
    super._addEventListeners();

    this.rootElement.addEventListener('keyup', (event) => {

      if (event.key !== "Enter") {
        return;
      }

      this._onInputSubmitHandlers.executeHandlers(this.rootElement.value);
    });
  }

  onInputSubmit(handler) {
    this._onInputSubmitHandlers.addEventHandler(handler);
  }
}
