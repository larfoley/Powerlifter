import Route from './protected';

export default class GoalsRoute extends Route {
  model() {
    return this.store.findAll('goal');
  }
}
