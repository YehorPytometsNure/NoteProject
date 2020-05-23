import StateAwareComponent from '../componets/state-aware-component.js';

export default class NotesPage extends StateAwareComponent {

  constructor(container, stateManager, {titleService}) {
    super(container, stateManager, {titleService});
  }

  _markup() {
    return `
        <header class="header">
            <div class="column-left">
                <img class="logo" src="./././images/logo.png" alt="logo">
                <div class="find"><input class="input" type="text" placeholder="Type in to find a note..."></div>
            </div>
            <div class="column-right">
                <img class="profile_ava" src="./././images/profile_ava.jpg" alt="profile_ava">
                <img class="arrow_down" src="./././images/arrow_down.png" alt="arrow_down">
                <div class="name">admin</div>
                <div data-type="page-loader-container"></div>
            </div>
        </header>
        <div class="menu">
            <img class="arrow_right" src="./././images/arrow_right.png" alt="arrow_right">
        </div>
        <div class="tags"></div>
        <img class="plus" src="./././images/plus.png" alt="plus">
        <div class="profile_menu"></div>
        <div class="module_window"></div>
        <div class="mascot-container">
            <img src="./././images/menu-mascot/tutorial.png" class="tutorial-seal" alt="mascot"/>
        </div>  
    `;
  }


  /**
   * Add following components^
   * TODO: search bar
   * TODO: user details
   * TODO: mascot
   * TODO: add note button
   * TODO: menu
   *
   * @private
   */
  _initNestedComponents() {

  }

  initState() {
  }
}
