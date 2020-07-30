import Route from '../protected';

export default class MyNetworkFeedRoute extends Route {
  model() {
    return this.store.query('post', { limit: 5, offset: 0 });
  }
}
