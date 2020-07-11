import Route from '@ember/routing/route';

export default class WorkoutHistoryRoute extends Route {
  model() {
    return this.store.findAll('workout-program');
  }
}
