import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class WorkoutController extends Controller {
  @service router;

  get showNavbar() {
    return [
      'workout.diary', 'workout.programs.index', 'workout.history'
    ].includes(this.router.currentRouteName);
  }
}
