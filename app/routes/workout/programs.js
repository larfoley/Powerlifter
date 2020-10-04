import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class WorkoutMyProgramsRoute extends Route {
  @service currentUser;
  @service workout;

  model() {
    return hash({
      programs: this.currentUser.user.workoutProgramTemplates,
      activeProgram: this.workout.currentWorkoutProgram
    })
  }
}
