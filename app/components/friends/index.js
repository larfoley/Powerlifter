import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FriendsComponent extends Component {
  @action
  async removeFriend(dropdown, friend) {
    dropdown.actions.close();
    friend.deleteRecord();
    return friend.save();
  }
}
