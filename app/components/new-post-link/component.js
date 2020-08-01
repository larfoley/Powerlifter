import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NewPostLinkComponent extends Component {
  @service currentUser;

  get user() {
    return this.currentUser.user
  }
}
