import Route from '@ember/routing/route';

export default class ProfileRoute extends Route {
  beforeModel() {
    this.transitionTo('profile.posts')
  }
}
