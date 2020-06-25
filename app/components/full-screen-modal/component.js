import Component from '@glimmer/component';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';

export default class FullScreenModalComponent extends Component {

  willDestroy() {
    document.body.classList.remove('noscroll');
  }

  get closeOnClickOverlay() {
    if (this.args.closeOnClickOverlay === undefined) {
      return true;
    }

    return this.args.closeOnClickOverlay;
  }

  shouldClose(element) {
    const onCloseIsFunction =  typeOf(this.args.onClose) === "function";
    const hasClickedOnPageOverlay =  element.classList.contains('full-screen-modal');

    return hasClickedOnPageOverlay && onCloseIsFunction && this.closeOnClickOverlay
  }

  @action
  addNoScrollClass() {
    document.body.classList.add('noscroll');
  }

  @action
  close(e) {
    if (this.shouldClose(e.target)) {
      this.args.onClose();
    }
  }
}
