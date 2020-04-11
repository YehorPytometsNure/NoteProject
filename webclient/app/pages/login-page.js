import Component from "../componets/component.js";
import LoginForm from "../componets/login-form.js";
import Image from "../componets/image.js";

export default class LoginPage extends Component {

    _markup() {
        const rootElement = document.createElement('div');
        rootElement.classList.add('bottom', 'side');
        rootElement.setAttribute('data-type', 'login-page-component');
        rootElement.setAttribute('data-test', 'login-page-component-rendered');
        rootElement.innerHTML = `
            <div class="content" data-type="login-page-content"></div>
        `;

        return rootElement;
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
