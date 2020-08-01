import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UserProfileComponent extends Component {
  @service currentUser;

  get coverPhoto() {
    return this.currentUser.user ? this.currentUser.user.coverPhoto : '';
  }

  get coverPhotoStyle() {
    return this.coverPhoto ? `url(${this.coverPhoto})` : '';
  }
}
