import Component from './component.js';

export default class Button extends Component {

  constructor(container, {href, textContent, type}) {
    super(container, {href, textContent, type});
    this.onClickHandlers = [];
  }

  _markup() {
    const {href, textContent, type} = this;

    return `
      <a class="buttons" href="${href}" type="${type}" data-type="button-component" data-test="button-rendered">
        ${textContent}
      </a>
    `;
  }

  _addEventListeners() {
    this.rootElement.addEventListener('click', (event) => {
      this.onClickHandlers.forEach((handler) => handler(event));
    });
  }

  onClickHandler(handler) {
    this.onClickHandlers.push(handler);
  }

  _initNestedComponents() {
  }
}
