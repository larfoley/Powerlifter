import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service currentUser;

  beforeModel() {
    // this.transitionTo('profile.posts')
  }

  model() {
    return this.currentUser.user
  }
}
