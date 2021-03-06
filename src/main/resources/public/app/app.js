import Component from './componets/component.js';
import LoginPage from './pages/login-page.js';
import Router from './services/router.js';
import RegistrationPage from './pages/registration-page.js';
import NotFoundPage from './pages/not-found-page.js';
import RouteChangedAction from './actions/route-changed-action.js';
import StateManager from './state/state-manager.js';
import ApiService from './services/api-service.js';
import TokenService from './services/token-service.js';
import State from './state/state.js';
import TitleService from './services/title-service.js';
import fetchMockMode from './mocks/fetch-mock-mode.js';

/**
 * Enumeration of possible url templates.
 *
 * @type {Readonly<{LOGIN: string, REGISTRATION: string}>}
 */
const UrlTemplates = Object.freeze({
  LOGIN: '/login',
  REGISTRATION: '/registration',
});

export default class Application extends Component {

  /**
   * Instantiates Component.
   *
   * @param {HTMLElement} container - app container.
   * @param {object} parameters - application parameters.
   * @param {boolean} parameters.devMode - if true - turn on development tools.
   */
  constructor(container, {devMode = false} = {}) {
    super(container, {devMode});
  }

  _initComponent() {
    super._initComponent();

    if (this.devMode) {
      fetchMockMode.turnOn();
    }
  }

  _markup() {
    return `
      <div class="application" data-type="application-component" data-test="application-component-rendered"></div>
    `;
  }

  _addEventListeners() {
  }

  _initNestedComponents() {
    const {rootElement} = this;
    const {LOGIN, REGISTRATION} = UrlTemplates;
    const tokenService = new TokenService(window.localStorage);
    const apiService = new ApiService(tokenService);
    const state = new State();
    const stateManager = new StateManager(state, {apiService});
    const titleService = new TitleService(document);

    const pageMappings = {
      [LOGIN]: (router) => new LoginPage(rootElement, {
        successfulResponseHandler: () => router.redirectTo(REGISTRATION),
        titleService,
        apiService,
      }),
      [REGISTRATION]: (router) => new RegistrationPage(rootElement, {
        successfulResponseHandler: () => router.redirectTo(LOGIN),
        titleService,
        apiService,
      }),
    };

    Router.getBuilder()
      .withWindow(window)
      .withPageContainer(rootElement)
      .withPageMappings(pageMappings)
      .withDefaultUrlHash(LOGIN)
      .withNotFoundPageCreator(() => new NotFoundPage(rootElement))
      .withHashChangeHandler((staticPart, dynamicPart) => {
        stateManager.dispatchAction(new RouteChangedAction(staticPart, dynamicPart));
      })
      .build();
  }
}
