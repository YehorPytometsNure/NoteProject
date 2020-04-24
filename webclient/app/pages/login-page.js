import Component from "../componets/component.js";
import LoginForm from "../componets/login-form.js";
import Image from "../componets/image.js";

export default class LoginPage extends Component {

    // TODO: refactor markup of login page.
    _markup() {
        return `
            <div class="bottom side" data-type="login-page-component" data-test="login-page-component-rendered">
                <div class="content" data-type="login-page-content"></div>
            </div>
        `;
    }

    _initNestedComponents() {
        const contentContainer = this.rootElement.querySelector('[data-type="login-page-content"]');
        new LoginForm(contentContainer);

        new Image(contentContainer, {
            classNames: ['right', 'side'],
            src: 'images/tutorial.png',
            alternativeText: 'Mascot',
        });
    }

    _addEventListeners() {
    }
}
