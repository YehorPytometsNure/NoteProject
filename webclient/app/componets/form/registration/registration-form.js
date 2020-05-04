import Component from "../../component.js";
import Input from "../../input.js";
import Button from "../../button.js";

export default class RegistrationForm extends Component {

    _markup() {
        return `
            <form class="left side registration" data-type="registration-form" data-test="registration-form-rendered">
                <div class="header">Hello! Are you ready to sign up?</div>
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

        new Input(rootElement, {
            inputAttributeId: 'confirm-password-input',
            labelTextContent: 'Confirm Password: ',
            inputAttributeType: 'password',
        });

        this.buttonComponent = new Button(rootElement, {
            href: '#/login',
            textContent: 'Register',
            type: 'submit',
        });
    }

    _addEventListeners() {
        this.buttonComponent.onClickHandler((event) => {

        })
    }
}
