import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { set } from '@ember/object';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

export default class WorkoutProgramComponent extends Component {
  @tracked showWorkoutCompleteDialog = false;
  @tracked selectedWorkoutDay = 1;

  get currentWorkout() {
    return this.workoutSessions.find(x => {
      return x.day === this.selectedWorkoutDay
    })
  }

  get workoutSessions() {
    const workoutSessions = A();
    const weeks = this.args.workoutProgram.weeks;

    weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workoutSessions.pushObject(workout);
      });
    });

    return workoutSessions;
  }


  get wokroutProgramIsCompleted() {
    return this.workoutsSessions.every(workout => workout.completed);
  }

  get canFinishWorkout() {
    return this.currentWorkout.everyWorkoutBlockIsCompleted;
  }

  get canFinishWorkoutProgram() {
    const completedSessions = this.workoutSessions
      .filter(workoutSession => workoutSession.everyWorkoutBlockIsCompleted)

    return completedSessions.length === this.workoutSessions;
  }

  get shouldDisableFinishWorkoutButton() {
    return !this.canFinishWorkoutSession;
  }

  get hasNextWorkout() {
    return isPresent(this._findWorkoutSession(this.selectedWorkoutDay + 1))
  }

  get hasPreviousWorkout() {
    return isPresent(this._findWorkoutSession(this.selectedWorkoutDay - 1))
  }

  @action
  toggleExerciseSetCompleted(exerciseSet) {
    exerciseSet.completed = !exerciseSet.completed;
  }

  @action
  goToNextWorkout(exerciseSet) {
    if (this.hasNextWorkout) {
      this.selectedWorkoutDay = this.selectedWorkoutDay + 1;
    }
  }

  @action
  goToPreviousWorkout(exerciseSet) {
    if (this.hasPreviousWorkout) {
      this.selectedWorkoutDay = this.selectedWorkoutDay - 1;
    }
  }

  @action
  updateExerciseSet(exerciseSet) {
    console.log(0);
  }

  get showFinishWorkoutProgramButton() {
    return this.args.workoutProgram.progress === 100 && !this.args.workoutProgram.completed;
  }

  @action
  async completeWorkout() {
    const workout = this.currentWorkout;

    if (!workout.completed) {

      workout.completed = true;
      this.showWorkoutCompleteDialog = true;

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

  @action
  onCloseWorkoutCompleteDialog() {
    this.showWorkoutCompleteDialog = false;

    if (this.hasNext) {
      this.goToNextWorkout()
    }
  }

  @action
  async completeWorkoutProgram() {
    const workoutSession = this.currentWorkoutSession;

    this.currentWorkoutSession.completed = true;
    this.args.workoutProgram.completed = true;
    // this.showWorkoutProgramCompleteDialog = true;
    alert()
  }

  _findWorkoutSession(day) {
    return this.workoutSessions.find(workout => workout.day === day)
  }
}
