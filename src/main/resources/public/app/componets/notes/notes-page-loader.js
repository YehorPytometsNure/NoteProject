import Component from '../component.js';

export default class NotesPageLoader extends Component {

  /**
   * @type {int}
   */
  _loadingState = 0;

  _markup() {
    const {_loadingState} = this;

    return `
        <div class="${_loadingState > 0 ? 'loadingio-spinner-eclipse-vg05wjn3dtp' : ''}">
            <div class="${_loadingState > 0 ? 'ldio-yftvigrggm8' : ''}">
                <div></div>
            </div>
        </div>
    `;
  }

  pushLoading() {
    this._loadingState++;
    this._render();
  }

  popLoading() {
    this._loadingState--;
    this._render();
  }
}
