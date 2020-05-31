import Component from '../../component.js';
import SelectFileService from '../../../services/select-file-service.js';
import EventHandlersStorage from '../../../event/event-handlers-storage.js';

export default class ProfileMenu extends Component {

  _selectedImageFile;

  _initComponent() {
    super._initComponent();
    this._onUserSubmitHandlers = new EventHandlersStorage();
    this._onLogOutClickHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div class="module_window profile_window">
            <div class="header_profile">
                <p class="profile_info_header">INFO</p>
                <img class="button_profile_close" src="././././images/close.png" alt="close" 
                    data-type="profile-menu-close-button">
            </div>
            <div class="info_profile">
                <div class="profile_menu_ava">
                    <img class="profile_menu_ava_img" src="././././images/profile_ava.jpg" alt="profile_ava" 
                        data-type="user-image">
                    <button class="set_profile_picture" data-type="set_profile_picture_button">
                        Set profile picture
                      </button>
                </div>
                <div class="textarea_menu">
                    <p class="settings">Name</p>
                    <input class="name_profile" value="" data-type="user-name">
                    <p class="settings">Birth</p>
                    <input class="birthday" type="date" value="" data-type="user-date">
                    <p class="settings">Login</p>
                    <input class="login" type="text" value="" data-type="user-login">
                    <p class="settings">Password</p>
                    <input class="password" type="password" value="" data-type="user-password">
                </div>
            </div>
            <div class="footer_profile">
                <a href="#/login" data-type="profile-menu-log-out-button">Log Out</a>
                <img class="footer_profile_ok" src="././././images/ok.png" data-type="profile-menu-ok-button">
            </div>
        </div>
    `;
  }

  _initNestedComponents() {
    super._initNestedComponents();

    const {rootElement} = this;

    this._closeButton = this.rootElement.querySelector('[data-type="profile-menu-close-button"]');
    this._okButton = this.rootElement.querySelector('[data-type="profile-menu-ok-button"]');
    this._logOutButton = this.rootElement.querySelector('[data-type="profile-menu-log-out-button"]');

    this._setUserImageButton = rootElement.querySelector('[data-type="set_profile_picture_button"]');

    this._userImage = rootElement.querySelector('[data-type="user-image"]');
    this._userName = rootElement.querySelector('[data-type="user-name"]');
    this._userDate = rootElement.querySelector('[data-type="user-date"]');
    this._userEmail = rootElement.querySelector('[data-type="user-login"]');
    this._userPassword = rootElement.querySelector('[data-type="user-password"]');
  }

  _addEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.hide();
    });

    this._okButton.addEventListener('click', () => {
      const newUser = Object.assign({}, this._user, this._gatherRenderedUserData());
      this._onUserSubmitHandlers.executeHandlers(newUser);
    });

    this._setUserImageButton.addEventListener('click', async () => {
      const service = new SelectFileService();
      const file = await service.selectImage();
      this._renderImage(file);
    });

    this._logOutButton.addEventListener('click', () => {
      this._onLogOutClickHandlers.executeHandlers();
    });
  }

  hide() {
    this.rootElement.style.display = 'none';
  }

  _renderImage(imageBlob) {
    this._userImage.src = URL.createObjectURL(imageBlob);
    this._selectedImageFile = imageBlob;
  }

  _renderName(name) {
    this._userName.value = name;
  }

  _renderEmail(email) {
    this._userEmail.value = email;
  }

  _renderPassword(password) {
    this._userPassword.value = password;
  }

  _renderBirthDate(date) {
    this._userDate.value = date;
  }

  show() {
    this.rootElement.style.display = 'block';
  }

  _gatherRenderedUserData() {
    const newUser = {};

    if (this._selectedImageFile) {
      newUser.avatar = this._selectedImageFile
    }

    if (this._userName.value) {
      newUser.name = this._userName.value;
    }

    if (this._userEmail.value) {
      newUser.email = this._userEmail.value;
    }

    if (this._userPassword.value) {
      newUser.password = this._userPassword.value;
    }

    if (this._userDate.value) {
      newUser.birthDate = this._userDate.value;
    }

    return newUser;
  }

  /**
   * User model.
   *
   * @param {UserModel} user
   */
  set user(user) {
    this._user = user;

    this._renderImage(user.avatar);
    this._renderName(user.name);
    this._renderEmail(user.email);
    this._renderPassword(user.password);
    this._renderBirthDate(user.birthDate);
  }

  onUserSubmit(handler) {
    this._onUserSubmitHandlers.addEventHandler(handler);
  }

  onLogOutClick(handler) {
    this._onLogOutClickHandlers.addEventHandler(handler);
  }
}
