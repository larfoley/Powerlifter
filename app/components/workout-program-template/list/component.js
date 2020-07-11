import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class WorkoutProgramTemplateListComponent extends Component {
  @service currentUser;
  @service toast;
  @service router;
  @service workout;

  @tracked selectedProgram;
  @tracked showingActivateProgramConfirmDialog = false;

  @action
  deleteWorkoutProgram(program) {
    program.deleteRecord(program);
    program.save()
  }

  @action
  async activateProgram(program) {
    if (this.showingActivateProgramConfirmDialog) {
      this.showingActivateProgramConfirmDialog = false;
    }

    try {
      await this.workout.activateProgram(program);
      this.toast.success('Workout program started');
      this.router.transitionTo('workout.diary');

    } catch (e) {
      this.toast.error('An error has occured. Try again later');
      console.log(e);
    }

  }

  @action
  showActivateProgramConfirmDialog(program) {
    if (program) {
      this.selectedProgram = program;
    }
    this.showingActivateProgramConfirmDialog = true;
  }

  @action
  hideActivateProgramConfirmDialog() {
    this.selectedProgram = null;
    this.showingActivateProgramConfirmDialog = false;
  }
}
