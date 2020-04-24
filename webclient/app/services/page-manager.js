/**
 * Manager is responsible for rendering pages on provided dom element.
 */
export default class PageManager {

    /**
     * Is map of key value pairs, where key is a hash and value is a creator of component.
     * @type {{key: string, value: (function(): Component)}}
     * @private
     */
    pageMappings;

    /**
     * Creates a page to display in case of wrongly-passed key.
     * @type {function(properties: object): Component}
     * @private
     */
    notFoundPageCreator;

    /**
     * Element, content of which will be cleared before page rendering.
     * @type {Element}
     * @private
     */
    rootElement;

    /**
     * Instantiates PageManager.
     * TODO: make it accept object.
     * @param {{key: string, value: (function(): Component)}} pageMappings - is map of key value pairs, where key is a
     * hash and value is a creator of component.
     * @param {function(properties: object): Component} notFoundPageCreator  - creates a page to display in case of
     * wrongly-typed hash.
     * @param {Element} rootElement - element, content of which will be cleared before page rendering.
     */
    constructor(pageMappings, notFoundPageCreator, rootElement) {
        Object.assign(this, {pageMappings, notFoundPageCreator, rootElement});
    }

    /**
     * Clears inner content of root element.
     */
    clearRootElement() {
        this.rootElement.innerHTML = '';
    }

    /**
     * Renders ui page, mapped to specified hash.
     * Before rendering new page, clears content root container, e.g. previous page.
     * TODO: make it public
     * @param {string} key - is a kay, which may be mapped to pages.
     * @param {object} properties - properties, that should be passed to page..
     */
    renderPage(key, properties) {
        const createPage = this._retrievePageCreator(key);
        createPage(properties);
    }

    /**
     * Retrieves page for provided hash or 'not-found' otherwise.
     *
     * @param {string} key - value, that maps to a specific page.
     * @return {function(properties: object): Component} page to render.
     */
    _retrievePageCreator(key) {
        const pageCreator = this.pageMappings[key];
        return pageCreator ? pageCreator : this.notFoundPageCreator;
    }
}
