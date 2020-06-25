import Route from '../../protected';

export default class MyNetworkFriendsIndexRoute extends Route {
  model() {
    return this.store.findAll('friend');
  }
}
