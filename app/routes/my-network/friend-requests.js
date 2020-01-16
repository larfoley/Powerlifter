import Route from '@ember/routing/route';

export default class MyNetworkFriendRequestsRoute extends Route {
  model() {
    return this.store.query('user', { friendRequest: true });
  }
}
