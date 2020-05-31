import StateAwareComponent from '../componets/state-aware-component.js';
import NotesPageLoader from '../componets/notes/notes-page-loader.js';
import GetNotesAction from '../actions/get-notes-action.js';
import NotesGrid from '../componets/notes/notes-grid.js';
import GetPreviouslyVisitedTagsAction from '../actions/get-previously-visited-tags-action.js';
import NoteWindow from '../componets/notes/pop-up/note-window.js';
import CreateNoteAction from '../actions/create-note-action.js';
import UpdateNoteAction from '../actions/update-note-action.js';
import DeleteNoteAction from '../actions/delete-note-action.js';
import NavigationMenu from '../componets/notes/navigation-menu/navigation-menu.js';
import GetAllTagsAction from '../actions/get-all-tags-action.js';
import ClearCurrentNotesMutator from '../mutators/clear-current-notes-mutator.js';
import CreateTagAction from '../actions/create-tag-action.js';
import NotesPageMascot from '../componets/notes/pop-up/notes-page-mascot.js';
import SearchBar from '../componets/notes/search-bar.js';
import GetNotesByNameAction from '../actions/get-notes-by-name-action.js';
import ProfileMenu from '../componets/notes/pop-up/profile-menu.js';
import UploadUserAction from '../actions/upload-user-action.js';
import GetUserAction from '../actions/get-user-action.js';
import Tag from '../models/note/tag.js';
import LogOutAction from '../actions/log-out-action.js';
import AuthenticationError from '../models/errors/authentication-error.js';
import EventHandlersStorage from '../event/event-handlers-storage.js';
import IdService from '../services/id-service.js';

export default class NotesPage extends StateAwareComponent {

  constructor(container, stateManager, {titleService}) {
    super(container, stateManager, {titleService});
  }

  _initComponent() {
    super._initComponent();
    this._onAuthenticationErrorHandlers = new EventHandlersStorage();
  }

  _markup() {
    return `
        <div data-type="notes-page" class="notes-page">
            <header class="header">
                <div class="column-left">
                    <img class="logo" src="./././images/logo.png" alt="logo">
                    <div class="find" data-type="search-bar-container"></div>
                </div>
                <div class="column-right">
                    <img class="profile_ava" src="./././images/profile_ava.jpg" alt="profile_ava" data-type="profile-button">
                    <img class="arrow_down" src="./././images/arrow_down.png" alt="arrow_down">
                    <div class="name" data-type="notes-page-user-name"></div>
                    <div data-type="page-loader-container"></div>
                </div>
            </header>
            <div class="menu">
                <img class="arrow_right" src="./././images/arrow_right.png" alt="arrow_right" 
                    data-type="navigation-menu-opener">
                <div data-type="side-navigation-menu-container"></div>
            </div>
            <div class="tags" data-type="tags-container">
                <div class="name_tag tags_actions_name">
                    <p data-type="notes-group-tag-name">Sort By: </p>
                </div>                
                <div class="name_tag tags_actions" data-type="sort-by-name-button">
                    <p data-type="notes-group-tag-name">Name</p>
                </div>                
                <div class="name_tag tags_actions" data-type="sort-by-tag-button">
                    <p data-type="notes-group-tag-name">Tag</p>
                </div>
            </div>
            <img class="plus" src="./././images/plus.png" alt="plus" data-type="add-note-button">
            <div data-type="profile-menu-container"></div>
            <div data-type="note-window-container"></div>
            <div data-type="mascot-container"></div>  
        </div>
    `;
  }


  /**
   * @private
   */
  _initNestedComponents() {
    const {rootElement} = this;

    const loaderContainer = rootElement.querySelector('[data-type="page-loader-container"]');
    this._loader = new NotesPageLoader(loaderContainer);

    const notesGridContainer = rootElement.querySelector('[data-type="tags-container"]');
    this._notesGrid = new NotesGrid(notesGridContainer);

    const noteEditingWindowContainer = rootElement.querySelector('[data-type="note-window-container"]');
    this._noteEditingWindow = new NoteWindow(noteEditingWindowContainer);
    this._noteEditingWindow.hide();

    const navigationMenuContainer = rootElement.querySelector('[data-type="side-navigation-menu-container"]');
    this._sideNavigationMenu = new NavigationMenu(navigationMenuContainer);

    const mascotContainer = this.rootElement.querySelector('[data-type="mascot-container"]');
    this._mascotComponent = new NotesPageMascot(mascotContainer);
    this._mascotComponent.hideMascot();

    const searchBarContainer = this.rootElement.querySelector('[data-type="search-bar-container"]');
    this._searchBar = new SearchBar(searchBarContainer);
    this._searchBar.onInputSubmit(async (input) => {
      await this.dispatch(new GetNotesByNameAction(input));
    });
    this._searchBar.onInputClose(async () => {
      this.stateManager.mutate(new ClearCurrentNotesMutator());
      const tags = this.stateManager.state.previouslyVisitedTags;
      for (const tag of tags) {
        await this.dispatch(new GetNotesAction(tag));
      }
    });

    const profileMenuContainer = this.rootElement.querySelector('[data-type="profile-menu-container"]');
    this._profileMenu = new ProfileMenu(profileMenuContainer);
    this._profileMenu.hide();

    this._profileMenu.onUserSubmit(async (user) => {
      await this.dispatch(new UploadUserAction(user));
      this._profileMenu.hide();
      await this.dispatch(new GetUserAction());
    });

    this._profileMenu.onLogOutClick(() => {
      this.dispatch(new LogOutAction());
    });
  }

  _addEventListeners() {
    const addNoteButton = this.rootElement.querySelector('[data-type="add-note-button"]');

    this._noteEditingWindow.onAcceptCreating(async (note) => {
      await this.dispatch(new CreateNoteAction(note));

      this._noteEditingWindow.hide();

      this.stateManager.mutate(new ClearCurrentNotesMutator());
      await this.dispatch(new GetPreviouslyVisitedTagsAction());

      // const tags = this.stateManager.state.previouslyVisitedTags;
      // for (const tag of tags) {
      //   await this.dispatch(new GetNotesAction(tag));
      // }
    });

    this._noteEditingWindow.onAcceptEditing(async (note) => {
      await this.dispatch(new UpdateNoteAction(note));

      this._noteEditingWindow.hide();

      this.stateManager.mutate(new ClearCurrentNotesMutator());
      await this.dispatch(new GetPreviouslyVisitedTagsAction());

      // const tags = this.stateManager.state.previouslyVisitedTags;
      // for (const tag of tags) {
      //   await this.dispatch(new GetNotesAction(tag));
      // }
    });

    addNoteButton.addEventListener('click', () => {
      this._noteEditingWindow.tags = this.stateManager.state.allTags;
      this._noteEditingWindow.creatingMode();
    });

    this._notesGrid.onItemSelected((note) => {
      this._noteEditingWindow.note = note;
      this._noteEditingWindow.tags = this.stateManager.state.allTags;
      this._noteEditingWindow.editingMode();
    });

    this._notesGrid.onBinDeleteClick(async (notes) => {
      for (const note of notes) {
        await this.dispatch(new DeleteNoteAction(note));
      }

      this.stateManager.mutate(new ClearCurrentNotesMutator());
      await this.dispatch(new GetPreviouslyVisitedTagsAction());

      // const tags = this.stateManager.state.previouslyVisitedTags;
      // for (const tag of tags) {
      //   await this.dispatch(new GetNotesAction(tag));
      // }
    });

    this._noteEditingWindow.onDeleteButtonClick(async (note) => {

      if (note.tag.name !== 'bin') {
        await this.dispatch(new UpdateNoteAction(Object.assign({}, note, {
          tag: {
            id: '',
            name: 'bin',
          },
        })));
      } else {
        await this.dispatch(new DeleteNoteAction(note));
      }

      this._noteEditingWindow.hide();
      this.stateManager.mutate(new ClearCurrentNotesMutator());
      await this.dispatch(new GetPreviouslyVisitedTagsAction());

      // const tags = this.stateManager.state.previouslyVisitedTags;
      // for (const tag of tags) {
      //   await this.dispatch(new GetNotesAction(tag));
      // }
    });

    this._sideNavigationMenu.onTagSelected(async (tag) => {
      this._sideNavigationMenu.closeMenu();
      this.stateManager.mutate(new ClearCurrentNotesMutator());
      await this.dispatch(new GetNotesAction(tag));
    });

    const navigationMenuOpener = this.rootElement.querySelector('[data-type="navigation-menu-opener"]');
    navigationMenuOpener.addEventListener('click', () => {
      this._sideNavigationMenu.openMenu();
    });

    this._sideNavigationMenu.onTagInputSubmit(async (inputValue) => {
      this._sideNavigationMenu.hideTagInput();
      await this.dispatch(new CreateTagAction(inputValue));
      await this.dispatch(new GetAllTagsAction());
    });

    this._sideNavigationMenu.onBinClick(async () => {
      this._sideNavigationMenu.closeMenu();
      this.stateManager.mutate(new ClearCurrentNotesMutator());
      const stateManager = this.stateManager;
      await this.dispatch(new GetNotesAction(new Tag({
        id: stateManager.state.previouslyVisitedTags.find((tag) => tag.name === 'bin').id,
        name: 'bin',
      })));
    });

    this._noteEditingWindow.onRecognizingStart(() => {
      this._mascotComponent.showMessage('Say a sentence!');
      this._mascotComponent.displayMascot();
    });

    this._noteEditingWindow.onRecognizingPause(() => {
      this._mascotComponent.showMessage('Wait!\nI\'m thinking.');
      this._mascotComponent.displayMascot();
    });

    this._noteEditingWindow.onRecognizingStop(() => {
      this._mascotComponent.hideMascot();
    });

    const sortByNameButton = this.rootElement.querySelector('[data-type="sort-by-name-button"]');
    sortByNameButton.addEventListener('click', () => {
      this._notesGrid.renderNotesMap(this.stateManager.state.currentNotes, 'name');
    });

    const sortByTagButton = this.rootElement.querySelector('[data-type="sort-by-tag-button"]');
    sortByTagButton.addEventListener('click', () => {
      this._notesGrid.renderNotesMap(this.stateManager.state.currentNotes, 'tag');
    });

    const profileButton = this.rootElement.querySelector('[data-type="profile-button"]');
    profileButton.addEventListener('click', () => {
      this._profileMenu.show();
    });
  }

  initState() {
    super.initState();

    const {_loader} = this;

    this.onStateChanged('arePreviouslyVisitedTagsLoading', (event) => {
      const isLoading = event.detail.state.arePreviouslyVisitedTagsLoading;

      if (isLoading) {
        _loader.pushLoading();
        return;
      }

      _loader.popLoading();
    });

    this.onStateChanged('previouslyVisitedTags', (event) => {

      this.stateManager.mutate(new ClearCurrentNotesMutator());
      const tags = event.detail.state.previouslyVisitedTags.filter((tag) => tag.name !== 'bin');
      tags.forEach(async (tag) => await this.dispatch(new GetNotesAction(tag)));
    });

    this.onStateChanged('previouslyVisitedTagsLoadingError', (event) => {
      const error = event.detail.state.previouslyVisitedTagsLoadingError;
      this._handleError(error);
    });

    this.onStateChanged('areAllTagsLoading', (event) => {
      const isLoading = event.detail.state.areAllTagsLoading;

      if (isLoading) {
        _loader.pushLoading();
        return;
      }

      _loader.popLoading();
    });

    this.onStateChanged('allTagsLoadingError', (event) => {
      const error = event.detail.state.allTagsLoadingError;
      this._handleError(error);
    });

    this.onStateChanged('areCurrentNotesLoading', (event) => {
      const isLoading = event.detail.state.areCurrentNotesLoading;

      if (isLoading) {
        _loader.pushLoading();
        return;
      }

      _loader.popLoading();
    });

    this.onStateChanged('currentNotes', (event) => {
      this._notesGrid.renderNotesMap(event.detail.state.currentNotes);
    });

    this.onStateChanged('currentNotesLoadingError', (event) => {
      const error = event.detail.state.currentNotesLoadingError;
      this._handleError(error);
    });

    this.onStateChanged('location', async (event) => {
      const {location} = event.detail.state;

      if (location === '/notes') {
        await this.dispatch(new GetUserAction());
        await this.dispatch(new GetPreviouslyVisitedTagsAction());
        await this.dispatch(new GetAllTagsAction());
      }
    });

    this.onStateChanged('allTags', (event) => {
      this._sideNavigationMenu.tags = event.detail.state.allTags;
    });

    this.onStateChanged('currentUser', (event) => {
      const user = event.detail.state.currentUser;
      const {rootElement} = this;
      this._profileMenu.user = user;
      rootElement.querySelector('[data-type="notes-page-user-name"]').textContent = user.name;
      rootElement.querySelector('[data-type="profile-button"]').src = URL.createObjectURL(user.avatar);
    });
  }

  /**
   *
   * @param {Error} error
   * @private
   */
  _handleError(error) {

    if (error instanceof AuthenticationError) {
      this._handleAuthenticationError();
    } else {
      alert(error);
    }
  }

  /**
   * Handles authentication error.
   * @private
   */
  _handleAuthenticationError() {
    this._onAuthenticationErrorHandlers.executeHandlers();
  }

  /**
   * Registers authentication-error handler.
   *
   * @param {function()} handler - handler to register.
   */
  onAuthenticationError(handler) {
    this._onAuthenticationErrorHandlers.addEventHandler(handler);
  }
}
