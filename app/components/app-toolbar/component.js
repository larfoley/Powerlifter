import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FindFriendsComponent extends Component {
  @service session;

  @action
  goBack() {
    window.history.back()
  }
}
