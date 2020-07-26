import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FriendRequestsComponent extends Component {
  @action
  cancelOrDecline(friendRequest) {
    friendRequest.deleteRecord();
    friendRequest.save();
  }

  @action
  acceptFriendRequest(friendRequest) {
    friendRequest.save();
  }
}
