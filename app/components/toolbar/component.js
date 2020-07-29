import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default class ToolbarComponent extends Component {
  @service currentUser;

  get sticky() {
    if (isPresent(this.args.sticky)) {
      return this.args.sticky;
    }

    return true;
  }
}
