import Component from "./componets/component.js";
import LoginPage from "./pages/login-page.js";

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
    }
}
