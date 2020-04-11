import Component from "./componets/component.js";
import LoginPage from "./pages/login-page.js";

export default class Application extends Component {

    _markup() {
        const rootElement = document.createElement('div');
        rootElement.classList.add('application');
        rootElement.setAttribute('data-type', 'application-component');
        rootElement.setAttribute('data-test', 'application-component-rendered');

        return rootElement;
    }

    _addEventListeners() {
    }

    _initNestedComponents() {
        new LoginPage(this.rootElement);
    }
}
