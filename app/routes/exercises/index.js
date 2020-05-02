import Route from '@ember/routing/route';

export default class ExercisesIndexRoute extends Route {
  model() {
    return this.store.findAll('exercise');
  }
}
