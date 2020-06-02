import Component from '../componets/component.js';

export default class WelcomePage extends Component {

  _initComponent() {
    document.title = "Notes";
    super._initComponent();
  }

  _markup() {
    return `
        <div class="welcome-page bottom side">
            <div class="content">
                <div class="left side left-side-welcome-page" style="margin-right: -70px; height: 440px; padding: 50px;">
                    <img src="images/logo.png" class="logo">
                    <div class="left-side-inner-div login" style="font-size: 34px; margin-top: 10px">Meow!<br>You always wanted to plan your day, but didn't have a proper app?
                        <br>Well, time changes!<br>Join our great community and become a member of all-do-in-time club!<br>Meow!
                    </div>
                    <div class="left-side-inner-div button-div">
                        <a class="buttons" href='#/registration' style="text-align: right; margin-right: 30px;">
                            <img class="fish" src="images/arrow_left.png" style="margin-left: -5px; float: left; margin-right: -5px;">
                            <p class="fish-button-text">Sign Up</p>
                        </a>
                        <a class="buttons" href='#/login' >
                            <img class="fish" src="images/arrow_right.png">
                            <p class="fish-button-text">Log in</p>
                        </a>
                    </div>
                </div>
                <img class="right side" style="margin-left: -20px" src = "images/menu-mascot/static.png">
            </div>
      </div>
    `;
  }
}
