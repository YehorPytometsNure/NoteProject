import Component from "./componets/component.js";
import LoginPage from "./pages/login-page.js";
import Router from "./services/router.js";
import PageManager from "./services/page-manager.js";
import RegistrationPage from "./pages/registration-page.js";

export default class Application extends Component {

    _markup() {
        return `
            <div class="application" data-type="application-component" data-test="application-component-rendered"></div>
        `;
    }

    _addEventListeners() {
    }

    _initNestedComponents() {
        const {rootElement} = this;
        const pageMappings = {
            '/login': (properties) => new LoginPage(rootElement, properties),
            '/registration': (properties) => new RegistrationPage(rootElement, properties),
        };

        const pageManager = new PageManager({
            pageMappings,
            notFoundPageCreator: () => {
            },
            rootElement,
        });

        new Router({
            defaultUrlHash: '/login',
            pageManager,
            window,
        });
    }
}
