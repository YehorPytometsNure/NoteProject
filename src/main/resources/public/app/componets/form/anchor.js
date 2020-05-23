import Component from '../component.js';

export default class Anchor extends Component {

  constructor(container, {href = '', textContent}) {
    super(container, {href, textContent});
    this.onClickHandlers = [];
  }

  _markup() {
    const {href, textContent} = this;

    return `
      <a class="buttons" href="${href}" data-type="button-component" data-test="button-rendered">
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
