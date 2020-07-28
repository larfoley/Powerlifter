import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UsersUserComponent extends Component {
  @service friends;
  @service router;
  
  @action
  async sendFriendRequest(user) {
    await this.friends.sendFriendRequest(user);
    this.router.transitionTo('my-network.friends');
  }
}
