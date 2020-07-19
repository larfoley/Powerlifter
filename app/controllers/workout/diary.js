import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { set } from '@ember/object';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

export default class WorkoutDiaryController extends Controller {
  queryParams = ['day', 'week', 'weekDay'];

  @tracked day = 1;
  @tracked week = 1;
  @tracked weekDay = 1;

  @action
  goToNextWorkout() {
    if (isPresent(this._findWorkoutSession(this.week, this.day + 1))) {
      this.day = this.day + 1
      this.week = 1;
      this.weekDay = 5;
    } else if (this._findWorkoutSession(this.week + 1, this.day)) {
      this.week = this.week + 1
    }
  }

  @action
  goToPreviousWorkout() {
    if (isPresent(this._findWorkoutSession(this.week, this.day - 1))) {
      this.day = this.day - 1
      this.week = 1;
    } else if (this._findWorkoutSession(this.week - 1, this.day)) {
      this.week = this.week - 1
    }
  }


  get hasNext() {
    if (isPresent(this._findWorkoutSession(this.week, this.day + 1))) {
      return true;
    }

    if (isPresent(this._findWorkoutSession(this.week + 1, this.day))) {
      return true;
    }

    return false;
  }

  get hasPrevious() {
    if (this._findWorkoutSession(this.week, this.day - 1)) {
      return true;
    }

    if (this._findWorkoutSession(this.week - 1, this.day)) {
      return true;
    }

    return false;
  }

  @action
  _findWorkoutSession(week, day) {
    const workoutWeek = this.model.weeks.find((w) => {
      return w.week === week;
    });

    if (workoutWeek) {
      return workoutWeek.workouts
        .filter((workout) => workout.weekDay === day)
        .firstObject;
    }
  }
}
