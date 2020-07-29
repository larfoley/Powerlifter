import Route from './protected';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service workout;

  async model() {
    return {
      liftRecords: this.store.query('lift-record', { limit: 3 }),
      goals: this.store.query('goal', { limit: 3, isCompleted: false }),
      currentWorkoutProgram: this.workout.currentWorkoutProgram
    }
  }
}
