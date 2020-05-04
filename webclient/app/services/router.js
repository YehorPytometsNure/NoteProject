/**
 * Manages routing behaviour and is responsible for rendering pages, mapped to routes.
 */
export default class Router {

    /**
     * Window object.
     * @type {Window}.
     * @private
     */
    window;

    /**
     * Handlers to trigger when 'hash-changed'.
     * @type {function(hash: string)[]}.
     * @private
     */
    hashChangeHandlers;

    /**
     * Page manager, which is responsible for page rendering.
     * @type {PageManager}
     * @private
     */
    pageManager;

    /**
     * Default uri hash used to refer to page when no hash provided.
     * @type {string}
     * @private
     */
    defaultUrlHash;

    /**
     * Creates instance of Router.
     *
     * @param {object} properties - configuration properties of router.
     * @param {PageManager} properties.pageManager - page manager, which is responsible for page rendering.
     * @param {Window} properties.window - global window object.
     * @param {string} properties.defaultUrlHash - default uri hash used to refer to page when no hash provided.
     */
    constructor({defaultUrlHash, pageManager, window = window}) {
        Object.assign(this, {defaultUrlHash, pageManager, window});
        this.hashChangeHandlers = [];
        this.init();
    }

    /**
     * Initializes router.
     * When page firstly loads - load page with default url hash.
     * When hash changes - load page with hash provided.
     * Each time page refreshes - load page with hash, specified in url or default hash if none specified.
     * @private
     */
    init() {
        const {window, hashChangeHandlers, pageManager} = this;

        hashChangeHandlers.push((hash) => {
            pageManager.clearRootElement();
            pageManager.renderPage(hash, {
                router: this,
            });
        });

        window.addEventListener('hashchange', () => {
            this._initiatePageRendering();
        });

        this._initiatePageRendering();
    }

    /**
     * Proceeds page rendering, considering current url.
     * @private
     */
    _initiatePageRendering() {
        const urlHash = this._getUrlHash();

        if (urlHash) {
            this._executeHashChangedHandlers(urlHash);
        } else {
            this.redirectTo(this.defaultUrlHash);
        }
    }

    /**
     * Executes 'hashChangeHandlers'.
     *
     * @param {string} hash - url hash value.
     * @private
     */
    _executeHashChangedHandlers(hash) {
        this.hashChangeHandlers.forEach((handler) => handler(hash));
    }

    /**
     * Retrieves url hash form url bar.
     *
     * @return {string} url hash value.
     * @private
     */
    _getUrlHash() {
        return this.window.location.hash.slice(1);
    }

    /**
     * Sets hash current url.
     *
     * @param {string} hash - hash route.
     */
    redirectTo(hash) {
        this.window.location.hash = `#${hash}`;
    }
}
