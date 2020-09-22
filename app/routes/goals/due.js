import Route from '@ember/routing/route';

export default class GoalsDueRoute extends Route {
  model() {
    return this.store.query('goal', { isCompleted: false });
  }
}
