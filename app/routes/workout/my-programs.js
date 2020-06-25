import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class WorkoutMyProgramsRoute extends Route {
  @service currentUser;

  model() {
    return this.currentUser.user.workoutPrograms;
  }
}
