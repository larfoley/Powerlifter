import Route from '@ember/routing/route';

export default class ProfileFriendsRoute extends Route {
  model() {
    return this.store.findAll('friend');
  }
}
