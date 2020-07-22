import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FriendRequestComponent extends Component {
  @service friends;
}
