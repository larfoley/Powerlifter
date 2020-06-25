import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { set } from '@ember/object';
import { A } from '@ember/array';

export default class WorkoutDiaryController extends Controller {
  queryParams = ['day', 'week'];

  @tracked day = 1;
  @tracked week = 1;
  @tracked weeks = this.model.weeks;

  get workouts() {
    const workoutSessions = A();

    this.weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workoutSessions.pushObject(workout);
      });
    });

    return workoutSessions;
  }

  get canFinishWorkoutSession() {
    return workouts.every(workout => workout.completed);
  }

  get shouldDisableFinishWorkoutButton() {
    return !this.canFinishWorkoutSession;
  }

  get everyWorkoutIsComplete() {
    return this.workouts.every(workout => workout.completed);
  }

  get currentWorkout() {
    const workouts = this.workouts
      .filter(({ week, weekDay }) => week === this.week && weekDay === this.day)


    return workouts.length > 0 ? workouts.firstObject : this.workouts.firstObject
  }

  get currentWorkoutIsComplete() {
    return this.workouts.objectAt(this.day - 1).completed;
  }

  get hasNext() {
    // return this.workouts.objectAt(this.day) !== undefined;
    return false;
  }

  get hasPrev() {
    // return this.workouts.objectAt(this.day - 2) != undefined;
    return false;
  }

  @action
  nextWorkout() {
    const next = this.workouts.objectAt(this.day);

    if (next !== undefined) {
      this.day += 1;
    }
  }

  @action
  previousWorkout() {
    const prev = this.workouts.objectAt(this.day - 1);

    if (prev !== undefined) {
      this.day -= 1;
    }
  }

  @action
  toggleSetCompleted(exerciseSet) {
    exerciseSet.completed = !exerciseSet.completed;
  }

  @action
  uploadRecords() {
    this.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        console.log('exercise', exercise);
      });
    });
  }

  @action
  async completeWorkoutSession() {
    const workoutSession = this.currentWorkout;

    if (!workoutSession.completed) {

      workoutSession.completed = true;

      // for (var exercise of workoutSession.exercises) {
      //   const liftRecord = this.store.createRecord('lift-record');
      //   await liftRecord.save();
      //
      //   if (liftRecord.isPersonalBest) {
      //     workoutSession.achievments.pushObject({
      //       achievedOn: new Date(),
      //       exerciseName: 'squat',
      //       weightLifted: 100,
      //       reps: 1
      //     });
      //   }
      // }
    }
  }
}
