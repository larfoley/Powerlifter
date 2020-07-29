import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service currentUser;

  get showCurrentWorkoutProgram() {
    const currentProgram = this.model.currentWorkoutProgram;

    return currentProgram && currentProgram.progress !== 100;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
