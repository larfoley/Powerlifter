import Route from '../protected';

export default class MyNetworkFriendsRoute extends Route {
  model() {
    return this.store.findAll('friend');
  }
}
