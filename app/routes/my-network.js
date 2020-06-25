import Route from '@ember/routing/route';

export default class MyNetworkRoute extends Route {
  model() {
    return this.store.findAll('user');
  }
}
