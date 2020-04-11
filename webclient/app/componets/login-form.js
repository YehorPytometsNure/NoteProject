import Component from "./component.js";
import Input from "./input.js";
import Button from "./button.js";

export default class LoginForm extends Component {

    _markup() {
        const rootElement = document.createElement('form');
        rootElement.classList.add('left', 'side');
        rootElement.setAttribute('data-type', 'login-form');
        rootElement.setAttribute('data-test', 'login-form-rendered');

        rootElement.innerHTML = `
            <div class="header">Hello! Are you ready to log in?</div>
        `;

        return rootElement;
    }

    _initNestedComponents() {
        const {rootElement} = this;

        new Input(rootElement, {
            inputAttributeId: 'email-input',
            labelTextContent: 'Email:',
            inputAttributeType: 'email',
        });

        new Input(rootElement, {
            inputAttributeId: 'password-input',
            labelTextContent: 'Password:',
            inputAttributeType: 'password',
        });

        this.buttonComponent = new Button(rootElement, {
            href: '#',
            textContent: 'Log in',
            type: 'submit',
        })
    }

    _addEventListeners() {
        this.buttonComponent.onClickHandler((event) => {

        })
    }
}
