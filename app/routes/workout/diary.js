import Route from '@ember/routing/route';

export default class WorkoutDiaryRoute extends Route {
  async model() {
    return await this.store.queryRecord('workout-program-history', {});
  }
}
