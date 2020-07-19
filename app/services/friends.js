import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FriendsService extends Service {
  @service store;
  @service toast;

  @action
  async cancelOrDeclineRequest(friendRequest) {

    try {
      const user = await friendRequest.user.id;
      const friend = await this.store.findRecord('user', friendRequest.friend._id);

      await friendRequest.destroyRecord();

      friend.friendRequestRecieved = false;
      friend.friendRequestSent = false;

    } catch (e) {
      console.log(e);
      fr.rollbackAttributes()
    }
  }

  @action
  async acceptFriendRequest(friendRequest) {
    try {
      await friendRequest.save();

      friendRequest.unloadRecord();

      this.toast.success('You are now friends with ' + friendRequest.username);
    } catch (e) {
      friendRequest.rollbackAttributes();
    }
  }

  @action
  async sendFriendRequest(user) {
    const friendRequest = this.store.createRecord('friend-request', {
      friend:  user.id,
      status: 'pending'
    })

    try {
      await friendRequest.save();
      user.friendRequestSent = true;
      this.toast.success('Request sent');

    } catch (e) {
      friendRequest.rollbackAttributes();
      this.toast.error('Unable to send friend request');
    }
  }
}
