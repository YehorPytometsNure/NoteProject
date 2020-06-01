import Anchor from './anchor.js';

export default class FishAnchor extends Anchor {

  _markup() {
    const {href, textContent} = this;

    return `
      <a class="buttons" href='${href}' data-type="button-component" data-test="button-rendered">
          <img class="fish" src="images/arrow_right.png">
          <p class="fish-button-text">${textContent}</p>
      </a>
    `;
  }
}
