import Route from '../protected';

export default class MyNetworkFeedRoute extends Route {
  async model() {
    return await this.store.findAll('post');
  }
}
