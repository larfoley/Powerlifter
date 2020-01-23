import Route from '../protected';

export default class MyNetworkFriendRequestsRoute extends Route {
  model() {
    return this.store.query('user', { friendRequest: true });
  }
}
