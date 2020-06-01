import Component from '../component.js';
import EventHandlersStorage from '../../event/event-handlers-storage.js';

export default class SearchBar extends Component {


  _initComponent() {
    super._initComponent();
    this._onInputSubmitHandlers = new EventHandlersStorage();
    this._onInputCloseHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div style="display: flex; flex-direction: row;">
            <input class="looking-for-note" type="text" placeholder="Type in to find a note..." data-type="input-element">
            <button data-type="clear-input-button" style="display: none;">Clear</button>
        </div>
    `;
  }

  _addEventListeners() {
    super._addEventListeners();

    this.rootElement.querySelector('[data-type="input-element"]').addEventListener('keyup', (event) => {

      if (event.key !== "Enter") {
        return;
      }

      this.rootElement.querySelector('[data-type="clear-input-button"]').style.display = 'block';
      this._onInputSubmitHandlers.executeHandlers(this.rootElement.querySelector('[data-type="input-element"]').value);
    });

    this.rootElement.querySelector('[data-type="clear-input-button"]').addEventListener('click', () => {
      this.rootElement.querySelector('[data-type="clear-input-button"]').style.display = 'none';
      this._onInputCloseHandlers.executeHandlers();
    });
  }

  onInputSubmit(handler) {
    this._onInputSubmitHandlers.addEventHandler(handler);
  }

  onInputClose(handler) {
    this._onInputCloseHandlers.addEventHandler(handler);
  }
}
