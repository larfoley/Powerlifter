import Route from '../protected';

export default class MyNetworkFeedRoute extends Route {
  async model() {
    const posts = await this.store.findAll('post');
    return posts.sortBy('createdAt')
  }
}
