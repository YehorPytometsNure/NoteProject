import Component from "./component.js";
import Input from "./input.js";
import Button from "./button.js";

export default class LoginForm extends Component {

    _markup() {
        return `
            <form class="left side" data-type="login-form" data-test="login-form-rendered">
                <div class="header">Hello! Are you ready to log in?</div>
            </form>
        `;
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
