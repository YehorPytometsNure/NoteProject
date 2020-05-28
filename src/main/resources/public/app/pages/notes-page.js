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

export default class NotesPage extends StateAwareComponent {

  constructor(container, stateManager, {titleService}) {
    super(container, stateManager, {titleService});
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
                    <img class="profile_ava" src="./././images/profile_ava.jpg" alt="profile_ava">
                    <img class="arrow_down" src="./././images/arrow_down.png" alt="arrow_down">
                    <div class="name">admin</div>
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
            <div class="profile_menu"></div>
            <div data-type="note-window-container"></div>
            <div data-type="mascot-container"></div>  
        </div>
    `;
  }


  /**
   * Add following components^
   * TODO: search bar
   * TODO: user details
   *
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
  }

  _addEventListeners() {
    const addNoteButton = this.rootElement.querySelector('[data-type="add-note-button"]');

    this._noteEditingWindow.onAcceptCreating(async (note) => {
      await this.dispatch(new CreateNoteAction(note));

      this._noteEditingWindow.hide();

      const tags = this.stateManager.state.previouslyVisitedTags;
      for (const tag of tags) {
        await this.dispatch(new GetNotesAction(tag));
      }
    });

    this._noteEditingWindow.onAcceptEditing(async (note) => {
      await this.dispatch(new UpdateNoteAction(note));

      this._noteEditingWindow.hide();

      const tags = this.stateManager.state.previouslyVisitedTags;
      for (const tag of tags) {
        await this.dispatch(new GetNotesAction(tag));
      }
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

    this._noteEditingWindow.onDeleteButtonClick(async (note) => {
      await this.dispatch(new DeleteNoteAction(note));

      const tags = this.stateManager.state.previouslyVisitedTags;
      for (const tag of tags) {
        await this.dispatch(new GetNotesAction(tag));
      }

      this._noteEditingWindow.hide();
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
      const tags = event.detail.state.previouslyVisitedTags;
      tags.forEach(async (tag) => await this.dispatch(new GetNotesAction(tag)));
    });

    this.onStateChanged('previouslyVisitedTagsLoadingError', (event) => {
      // TODO: error handling.
      const error = event.detail.state.previouslyVisitedTagsLoadingError;
      alert(error);
    });

    this.onStateChanged('areAllTagsLoading', (event) => {
      const isLoading = event.detail.state.areAllTagsLoading;

      if (isLoading) {
        _loader.pushLoading();
        return;
      }

      _loader.popLoading();
    });

    this.onStateChanged('allTags', (event) => {
      const tags = event.detail.state.allTags;
      //TODO: menu.
    });

    this.onStateChanged('allTagsLoadingError', (event) => {
      // TODO: error handling.
      const error = event.detail.state.allTagsLoadingError;
      alert(error);
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
      // TODO: error handling.
      const error = event.detail.state.currentNotesLoadingError;
      alert(error);
    });

    this.onStateChanged('location', async (event) => {
      const {location} = event.detail.state;

      if (location === '/notes') {
        await this.dispatch(new GetPreviouslyVisitedTagsAction());
        await this.dispatch(new GetAllTagsAction());
      }
    });

    this.onStateChanged('allTags', (event) => {
      this._sideNavigationMenu.tags = event.detail.state.allTags;
    });
  }
}
