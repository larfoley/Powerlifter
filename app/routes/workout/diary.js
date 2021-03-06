import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class WorkoutDiaryRoute extends Route {
  @service currentUser;
  @service workout;

  model() {
    return this.workout.currentWorkoutProgram;
  }
}
