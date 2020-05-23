import Component from '../component.js';

export default class Input extends Component {

  constructor(container, {inputAttributeId, labelTextContent, inputAttributeType, inputName}) {
    super(container, {inputAttributeId, labelTextContent, inputAttributeType, inputName});
  }

  _markup() {
    const {inputAttributeId, labelTextContent, inputAttributeType, inputName} = this;

    return `
      <div data-type="input-component" data-test="input-component-rendered">
        <label for="${inputAttributeId}">${labelTextContent}</label>
        <input id="${inputAttributeId}" type="${inputAttributeType}" name="${inputName}" data-type="input">
      </div>
    `;
  }

  _addEventListeners() {
  }

  _initNestedComponents() {
  }

  /**
   * Retrieves value of input element.
   *
   * @return {string} value of input element.
   */
  get inputValue() {
    return this.rootElement.querySelector('[data-type="input"]').value;
  }
}
