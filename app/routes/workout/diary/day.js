import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class WorkoutDiaryDayRoute extends Route {
  @service currentUser;
  @service workout;

  model(params) {
    console.log(params);
    // return this.workout.currentWorkoutProgram;
  }
}
