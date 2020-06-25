import Route from '../protected';

export default class MyNetworkFeedRoute extends Route {
  model() {
    return this.store.findAll('post')
  }
}
