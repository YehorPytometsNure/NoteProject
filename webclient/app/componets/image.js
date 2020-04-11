import Component from "./component.js";

export default class Image extends Component {

    constructor(container, {classNames, src, alternativeText}) {
        super(container, {classNames, src, alternativeText});
    }

    _markup() {
        const {classNames, src, alternativeText} = this;
        const rootElement = document.createElement('img');
        rootElement.classList.add(classNames);
        rootElement.setAttribute('src', src);
        rootElement.setAttribute('alt', alternativeText);
        rootElement.setAttribute('data-type', 'image-component');
        rootElement.setAttribute('data-test', 'image-component-rendered');

        return rootElement;
    }

    _addEventListeners() {
    }

    _initNestedComponents() {
    }
}
