import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { set } from '@ember/object';
import { A } from '@ember/array';

export default class WorkoutProgramComponent extends Component {
  @tracked showWorkoutCompleteDialog = false;

  get selectedWeek() {
    return this.args.selectedWeek || 1;
  }

  get selectedDay() {
    return this.args.selectedDay || 1;
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

  get currentWorkoutSession() {
    const workouts = this.workoutSessions
      .filter(({ week, weekDay }) => week === this.selectedWeek && weekDay === this.selectedDay);
      
    return workouts.length > 0 ? workouts.firstObject : this.workouts.firstObject
  }

  get wokroutProgramIsCompleted() {
    return this.workoutsSessions.every(workout => workout.completed);
  }

  get canFinishWorkoutSession() {
    return this.currentWorkoutSession.everyWorkoutBlockIsCompleted;
  }

  get canFinishWorkoutProgram() {
    const completedSessions = this.workoutSessions
      .filter(workoutSession => workoutSession.everyWorkoutBlockIsCompleted)

    return completedSessions.length === this.workoutSessions;
  }

  get shouldDisableFinishWorkoutButton() {
    return !this.canFinishWorkoutSession;
  }

  @action
  toggleExerciseSetCompleted(exerciseSet) {
    exerciseSet.completed = !exerciseSet.completed;
  }

  @action
  updateExerciseSet(exerciseSet, update) {
    exerciseSet.completed = !exerciseSet.completed;
  }

  @action
  async completeWorkoutSession() {
    const workoutSession = this.currentWorkoutSession;

    if (!this.currentWorkoutSession.completed) {

      this.currentWorkoutSession.completed = true;
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
  async completeWorkoutProgram() {
    const workoutSession = this.currentWorkoutSession;

    this.currentWorkoutSession.completed = true;
    this.args.workoutProgram.completed = true;
    // this.showWorkoutProgramCompleteDialog = true;
    alert()
  }
}
