import Route from '@ember/routing/route';

export default class ProfilePostsRoute extends Route {
  model() {
    return this.store.findAll('post');
  }
}
