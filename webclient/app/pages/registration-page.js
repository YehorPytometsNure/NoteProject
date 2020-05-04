import Component from "../componets/component.js";
import Image from "../componets/image.js";
import RegistrationForm from "../componets/form/registration/registration-form.js";

export default class RegistrationPage extends Component {

    _initComponent() {
        super._initComponent();
        document.title = 'Registration';
    }

    _markup() {
        return `
            <div class="bottom side" 
                data-type="registration-page-component" 
                data-test="registration-page-component-rendered">
                    <div class="content" data-type="registration-page-content"></div>
            </div>
        `;
    }

    _initNestedComponents() {
        const contentContainer = this.rootElement.querySelector('[data-type="registration-page-content"]');
        new RegistrationForm(contentContainer);

        new Image(contentContainer, {
            classNames: ['right', 'side'],
            src: 'images/tutorial.png',
            alternativeText: 'Mascot',
        });
    }

    _addEventListeners() {
    }
}
