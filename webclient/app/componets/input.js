import Component from './component.js';

export default class Input extends Component {

  constructor(container, {inputAttributeId, labelTextContent, inputAttributeType}) {
    super(container, {inputAttributeId, labelTextContent, inputAttributeType});
  }

  _markup() {
    const {inputAttributeId, labelTextContent, inputAttributeType} = this;

    return `
      <div data-type="input-component" data-test="input-component-rendered">
        <label for="${inputAttributeId}">${labelTextContent}</label>
        <input id="${inputAttributeId}" type="${inputAttributeType}">
      </div>
    `;
  }

  _addEventListeners() {
  }

  _initNestedComponents() {
  }
}
