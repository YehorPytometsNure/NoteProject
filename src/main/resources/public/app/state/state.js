/**
 * State of Notes Page.
 */
export default class State {

  /**
   * Static part of the url.
   * @type {string}
   */
  location;

  /**
   * Dynamic part of the url.
   * @type {object}
   */
  locationParams;

  /**
   * @type {boolean}
   */
  arePreviouslyVisitedTagsLoading;

  /**
   * @type {Tag[]}
   */
  previouslyVisitedTags = [];

  /**
   * @type {Error}
   */
  previouslyVisitedTagsLoadingError;

  /**
   * @type {boolean}
   */
  areAllTagsLoading;

  /**
   * @type {Tag[]}
   */
  allTags = [];

  /**
   * @type {Error}
   */
  allTagsLoadingError;

  /**
   * @type {boolean}
   */
  areCurrentNotesLoading;

  /**
   * @type {Map<Tag, NoteModel[]>}
   */
  currentNotes = new Map();

  /**
   * @type {Error}
   */
  currentNotesLoadingError;

  /**
   * @type {UserModel}
   */
  currentUser;
}
