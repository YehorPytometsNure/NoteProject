import Component from '../../component.js';
import NavigationMenuTag from './navigation-menu-tag.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NavigationMenu extends Component {

  _markup() {
    return `
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" data-type="close-navigation-menu-button">&times;</a>
            <div class="slide_menu">
                <p class="slide_menu_header">Menu</p>
<!--                TODO: make samples. -->
<!--                <p class="slide_menu_subheader">Samples</p>-->
<!--                <div class="first_menu">-->
<!--                    <p class="slide_menu_item">diary</p>-->
<!--                    <p class="slide_menu_item">calendar</p>-->
<!--                    <p class="slide_menu_item">to do list</p>-->
<!--                </div>-->
                <p class="slide_menu_subheader">Tags</p>
                <div class="second_menu" data-type="navigation-menu-tags-container"></div>
                <input class="input" type="text" placeholder="Enter tag name and press Enter" data-type="tag-input">
                <div class="create_new_tag" data-type="create-new-tag-button">create new tag</div>
                <p class="bin" data-type="bin-button">Bin</p>
                <div class="hide_helper">Hide helper</div>
            </div>
        </div>
    `;
  }

  _initComponent() {
    super._initComponent();
    this._onTagSelectedHandlers = new EventHandlersStorage();
    this._onTagInputSubmitHandlers = new EventHandlersStorage();
    this._binButtonClickHandlers = new EventHandlersStorage();
  }

  _initNestedComponents() {
    super._initNestedComponents();
    this.hideTagInput();
  }

  _addEventListeners() {
    super._addEventListeners();

    const closeButton = this.rootElement.querySelector('[data-type="close-navigation-menu-button"]');
    closeButton.addEventListener('click', () => {
      this.closeMenu();
    });

    const tagInput = this.rootElement.querySelector('[data-type="tag-input"]');
    tagInput.addEventListener('keyup', (event) => {

      if (event.key !== "Enter") {
        return;
      }

      this._onTagInputSubmitHandlers.executeHandlers(tagInput.value);
    });

    const createNewTagButton = this.rootElement.querySelector('[data-type="create-new-tag-button"]');
    createNewTagButton.addEventListener('click', () => {
      this.showTagInput();
    });

    const binButton = this.rootElement.querySelector('[data-type="bin-button"]');
    binButton.addEventListener('click', () => {
      this._binButtonClickHandlers.executeHandlers();
    });
  }

  set tags(tags) {
    const tagsContainer = this.rootElement.querySelector('[data-type="navigation-menu-tags-container"]');

    tagsContainer.innerHTML = '';

    tags.forEach((tag) => {
      const tagComponent = new NavigationMenuTag(tagsContainer, {tag});

      tagComponent.onClick((tag) => {
        this._onTagSelectedHandlers.executeHandlers(tag);
      });
    });
  }

  onTagSelected(handler) {
    this._onTagSelectedHandlers.addEventHandler(handler);
  }

  closeMenu() {
    this.rootElement.style.width = '0';
  }

  openMenu() {
    this.rootElement.style.width = '250px';
  }

  hideTagInput() {
    const tagInput = this.rootElement.querySelector('[data-type="tag-input"]');
    tagInput.style.display = "none";
  }

  showTagInput() {
    const tagInput = this.rootElement.querySelector('[data-type="tag-input"]');
    tagInput.style.display = "block";
  }

  onTagInputSubmit(handler) {
    this._onTagInputSubmitHandlers.addEventHandler(handler);
  }

  onBinClick(handler) {
    this._binButtonClickHandlers.addEventHandler(handler);
  }
}
