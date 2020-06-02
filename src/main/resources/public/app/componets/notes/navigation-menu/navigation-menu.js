import Component from '../../component.js';
import NavigationMenuTag from './navigation-menu-tag.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class NavigationMenu extends Component {

  _markup() {
    return `
        <div id="mySidenav" class="sidenav">
            <!--<a href="javascript:void(0)" class="closebtn" data-type="close-navigation-menu-button">&times;</a>-->
            
            <div class="scrollbar" id="style-scroll">
            
                <div class="slide_menu">
                    <p class="slide_menu_header">Menu</p>
                    
                    <img class="arrow_left" src="images/arrow_left.png" alt="arrow_left" data-type="close-navigation-menu-button">
                    
                    <p class="slide_menu_subheader">Tags</p>
                    
                    <img class="divide_wave" src="images/wave.png" alt="divide_wave">
                    
                    <div class="second_menu" data-type="navigation-menu-tags-container"></div>
                    
                    <input class="looking-for-note input" type="text" placeholder="Tag Name" data-type="tag-input">
    <!--                <input class="input" type="text" placeholder="Enter tag name and press Enter" data-type="tag-input">-->
                    
                    <div class="second_menu">
    <!--                <div class="create_new_tag" data-type="create-new-tag-button">create new tag</div>-->
                    <p id="create_new_tag" class="slide_menu_item" data-type="create-new-tag-button">+ create new
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" 
                    xml:space="preserve">
          <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
        </svg></p>
                    </div>
        
                    <div class="second_menu">
<!--                    <p class="bin" data-type="bin-button">Bin</p>-->
                    <p class="slide_menu_item bin" data-type="bin-button">Bin<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" 
                    style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
      <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
    </svg></p>
                    </div>
                    <div class="hide_helper">Hide helper</div>
                </div>
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
    // this.rootElement.style.width = '0';
    document.getElementById("mySidenav").style.transform = "translateX(-166px)";
    setTimeout(() => {
      document.getElementById("mySidenav").style.opacity = "0";
    }, 500);
    document.getElementById("mySidenav").style.pointerEvents = "none";
    document.querySelector(".menu .arrow_right").style.display = 'block';
  }

  openMenu() {
    // this.rootElement.style.width = '250px';
    document.getElementById("mySidenav").style.transform = "translateX(0)";
    document.getElementById("mySidenav").style.pointerEvents = "auto";
    document.getElementById("mySidenav").style.opacity = "1";
    document.querySelector(".menu .arrow_right").style.display = 'none';
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
