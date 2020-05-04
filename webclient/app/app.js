import Component from "./componets/component.js";
import LoginPage from "./pages/login-page.js";
import Router from "./services/router.js";
import PageManager from "./services/page-manager.js";

export default class Application extends Component {

    _markup() {
        return `
            <div class="application" data-type="application-component" data-test="application-component-rendered"></div>
        `;
    }

    _addEventListeners() {
    }

    _initNestedComponents() {
        new LoginPage(this.rootElement);
        const {rootElement} = this;
        const pageContainer = rootElement.querySelector('[data-type="application-component"]');
        const pageMappings = {
            '/login': (properties) => new LoginPage(pageContainer, properties),
        };

        const pageManager = new PageManager({
            pageMappings,
            notFoundPageCreator: () => {
            },
            rootElement: pageContainer,
        });

        new Router({
            defaultUrlHash: '/login',
            pageManager,
        });
    }
}
