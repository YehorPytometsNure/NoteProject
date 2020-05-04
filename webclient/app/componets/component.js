/**
 * @abstract
 */
export default class Component {

  rootElement;
  container;

  constructor(container, properties = {}) {
    this.container = container;
    Object.assign(this, properties);
    this._initComponent();
  }

  /**
   * @private
   */
  _initComponent() {
    this._render();
    this._initNestedComponents();
    this._addEventListeners();
  }

  /**
   * @private
   */
  _render() {
    if (this.rootElement) {
      this.rootElement.remove();
    }

    const fakeElement = document.createElement('div');
    fakeElement.innerHTML = this._markup();

    this.rootElement = fakeElement.firstElementChild;
    this.container.appendChild(this.rootElement);
  }

  /**
   * @abstract
   * @private
   * @return {string}
   */
  _markup() {

  }

  /**
   * @abstract
   * @private
   * @return {void}
   */
  _initNestedComponents() {

  }

  /**
   * @abstract
   * @private
   * @return {void}
   */
  _addEventListeners() {

  }

  /**
   * Destroys component.
   */
  willDestroy() {

  }

  /**
   * Clears content of root element.
   *
   * @param {Element} element - element, content of which is to be cleared.
   */
  clearElementContent(element) {
    element.innerHTML = '';
  }
}
