import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserCardComponent extends Component {
  @service currentUser;
  @service toast;
  @service session;
  @service store;

  @action
  async sendFriendRequest() {
    const user = this.args.user;

    const friendRequest = this.store.createRecord('friend-request', {
      from: this.currentUser.user.id,
      to: this.args.user.id,
      sendFriendRequest: true
    })

    try {
      await friendRequest.save();

      user.friendRequestSent = true;
      this.toast.success('Friend request sent');


    } catch (e) {
      friendRequest.rollbackAttributes();
      this.toast.error('Unable to send friend request');
    }

  }

  @action
  async acceptFriendRequest() {
    const user = this.args.user;

    const friendRequest = this.store.createRecord('friend-request', {
      from: this.currentUser.user.id,
      to: this.args.user.id,
      acceptFriendRequest: true
    })

    try {
      await friendRequest.save();

      user.isFriend = true;
      this.toast.success('Friend request sent');

    } catch (e) {
      friendRequest.rollbackAttributes();
      this.toast.error('Unable to accept friend request');
    }

  }

  @action
  async declineFriendRequest() {
    const user = this.args.user;

    const friendRequest = this.store.createRecord('friend-request', {
      from: this.currentUser.user.id,
      to: this.args.user.id,
      declineFriendRequest: true
    })

    try {
      await friendRequest.save();

      user.isFriend = true;
      this.toast.success('Friend request sent');

    } catch (e) {
      friendRequest.rollbackAttributes();
      this.toast.error('Unable to accept friend request');
    }

  }
}
