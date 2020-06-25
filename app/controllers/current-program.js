import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

export default class CurrentProgramController extends Controller {
  queryParams = ['day'];

  @tracked day = 1;
  @tracked model;

  get workouts() {
    return this.model.workouts;
  }

  get currentWorkout() {
    return this.workouts[this.day - 1];
  }

  get hasNext() {
    return this.workouts[this.day] !== undefined;
  }

  get hasPrev() {
    return this.workouts[this.day - 2] != undefined;
  }

  @action
  nextWorkout() {
    const next = this.workouts[this.day];

    if (next !== undefined) {
      this.day += 1;
    }
  }

  @action
  previousWorkout() {
    const prev = this.workouts[this.day - 1];

    if (prev !== undefined) {
      this.day -= 1;
    }
  }

}
