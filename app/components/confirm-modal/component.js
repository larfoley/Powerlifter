import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { action } from '@ember/object';

export default class ConfirmModalComponent extends Component {
  @action
  onCancel() {
    if (typeOf(this.args.onCancel) === 'function') {
      this.args.onCancel()
    }
  }

  onConfirm() {
    if (typeOf(this.args.onConfirm) === 'function') {
      this.args.onConfirm()
    }
  }
}
