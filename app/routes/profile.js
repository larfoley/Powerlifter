import Route from '@ember/routing/route';

export default class ProfileRoute extends Route {
  beforeModel(transition) {
    this.transitionTo('profile.posts')
  }
}
