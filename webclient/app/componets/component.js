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

    _initComponent() {
        this._render();
        this._initNestedComponents();
        this._addEventListeners();
    }

    _render() {
        const {rootElement, container} = this;

        if (rootElement) {
            rootElement.remove();
        }

        this.rootElement = this._markup();
        container.appendChild(this.rootElement);
    }

    /**
     * @abstract
     * @return {HTMLElement}
     */
    _markup() {
        return undefined;
    }

    /**
     * @abstract
     * @return {void}
     */
    _initNestedComponents() {

    }

    /**
     * @abstract
     * @return {void}
     */
    _addEventListeners() {

    }
}
