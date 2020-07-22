import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CheckboxComponent extends Component {
  @tracked _value;

  constructor() {
    super(...arguments);
    this._value = this.args.value || false;
  }

  get disabled() {
    return this.args.disabled;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  @action
  toggleValue() {
    if (!this.disabled) {
      this.value = !this.value;

      if (this.args.onChange) {
        this.args.onChange();
      }
    }
  }
}
