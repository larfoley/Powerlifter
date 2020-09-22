import Component from '@glimmer/component';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class FormComponent extends Component {
  @tracked isSubmiting = false;

  @action
  async handleSubmit(e) {
    e.preventDefault()

    const onSubmit = this.args.onSubmit;

    if (typeOf(onSubmit) === "function") {
      isSubmiting = true;

      await onSubmit();

      isSubmiting = false;
    }
  }
}
