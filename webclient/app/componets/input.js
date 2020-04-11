import Component from "./component.js";

export default class Input extends Component {

    constructor(container, {inputAttributeId, labelTextContent, inputAttributeType}) {
        super(container, {inputAttributeId, labelTextContent, inputAttributeType});
    }

    _markup() {
        const {inputAttributeId, labelTextContent, inputAttributeType} = this;
        const rootElement = document.createElement('div');
        rootElement.setAttribute('data-type', 'input-component');
        rootElement.setAttribute('data-test', 'input-component-rendered');

        rootElement.innerHTML = `
            <label for="${inputAttributeId}">${labelTextContent}</label>
            <input id="${inputAttributeId}" type="${inputAttributeType}">
        `;

        return rootElement;
    }

    _addEventListeners() {
    }

    _initNestedComponents() {
    }
}
