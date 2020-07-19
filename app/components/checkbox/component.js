import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CheckboxComponent extends Component {
  @tracked _checked;

  constructor() {
    super(...arguments);
    this._checked = this.args.checked || false;
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = value;
  }

  @action
  toggleValue() {
    this.checked = !this.checked;

    if (this.args.onChange) {
      this.args.onChange();
    }
  }
}
