import Route from './protected';

export default class HomeRoute extends Route {
  async model() {
    const posts = await this.store.findAll('post');
    return {
      posts: posts.sortBy('createdAt').reverse(),
      friends: this.store.findAll('friend'),
      personalBests: this.store.query('lift-record', { limit: 3, isPersonalBest: true }),
      goals: this.store.query('goal', { limit: 3 })
    }
  }
}
