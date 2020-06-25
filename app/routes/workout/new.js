import Route from '@ember/routing/route';

export default class WorkoutNewRoute extends Route {
  model() {
    return this.store.findAll('exercise');
  }
}
