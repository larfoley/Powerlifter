import Controller from '@ember/controller';
import { action } from '@ember/object'

export default class MyNetworkSearchController extends Controller {
  @action
  searchUsers(userSearchTerm) {
    return this.store.query('user', { search: userSearchTerm.trim() });
  }

  @action
  sendFriendRequest(user) {
    alert('Send friend request to ' + user.username)
  }
}
