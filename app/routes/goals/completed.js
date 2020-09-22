import Route from '@ember/routing/route';

export default class GoalsCompletedRoute extends Route {
  model() {
    return this.store.query('goal', { isCompleted: true });
  }
}
