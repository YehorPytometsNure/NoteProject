import Component from "./component.js";

export default class Button extends Component {

    constructor(container, {href, textContent, type}) {
        super(container, {href, textContent, type});
        this.onClickHandlers = [];
    }

    _markup() {
        const {href, textContent, type} = this;
        const rootElement = document.createElement('a');
        rootElement.classList.add('buttons');
        rootElement.setAttribute('href', href);
        rootElement.setAttribute('type', type);
        rootElement.setAttribute('data-type', 'button-component');
        rootElement.setAttribute('data-test', 'button-rendered');
        rootElement.textContent = textContent;

        return  rootElement;
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
