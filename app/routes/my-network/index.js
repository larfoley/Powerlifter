import Route from '../protected';

export default class MyNetworkIndexRoute extends Route {
  redirect() {
    this.transitionTo('/my-network/feed')
  }
}
