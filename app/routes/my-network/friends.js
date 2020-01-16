import Route from '@ember/routing/route';

export default class MyNetworkFriendsRoute extends Route {
  model() {
    return this.store.query('user', { friends: true });
  }
}
