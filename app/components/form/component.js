import Component from '@glimmer/component';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';

export default class FormComponent extends Component {
  @action
  handleSubmit(e) {
    e.preventDefault()

    const submitHandler = this.args.onSubmit;

    if (typeOf(submitHandler) === "function") {
      submitHandler();
    }
  }
}
