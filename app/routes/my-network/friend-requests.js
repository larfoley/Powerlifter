import Route from '../protected';
import { inject as service } from '@ember/service';

export default class MyNetworkFriendRequestsRoute extends Route {
  @service friends;

  model() {
    return this.store.findAll('friendRequest');
  }
}
