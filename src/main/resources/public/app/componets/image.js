import Component from './component.js';

export default class Image extends Component {

  constructor(container, {classNames, src, alternativeText}) {
    super(container, {classNames, src, alternativeText});
  }

  _markup() {
    const {classNames, src, alternativeText} = this;

    return `
      <img class="${classNames}" src="${src}" alt="${alternativeText}" data-type="image-component"
        data-test="image-component-rendered">
    `;
  }

  _addEventListeners() {
  }

  _initNestedComponents() {
  }
}
