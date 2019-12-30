import Route from '@ember/routing/route';

export default class MyNetworkIndexRoute extends Route {
  redirect() {
    this.transitionTo('/my-network/feed')
  }
}
