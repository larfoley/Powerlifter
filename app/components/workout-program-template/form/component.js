import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { A } from '@ember/array';
import { copy } from '@ember/object/internals';

export default class WorkoutProgramFormComponent extends Component {
  @service store;
  @service currentUser;
  @service router;

  @tracked showExerciseSelect = false;
  @tracked isInValid = true;
  @tracked workoutProgram;
  @tracked selectedWeekIndex = 0;
  @tracked weeks;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.workoutProgram) !== "instance") {
      this.workoutProgram = this.store.createRecord('workout-program');

    } else {
      this.workoutProgram = this.args.record;
    }

    this.workoutProgram.author = this.currentUser.user.username;
    this.weeks = this.workoutProgram.weeks;
  }

  willDestroy() {
    if (this.workoutProgram.isNew) {
      this.workoutProgram.deleteRecord();
    }
  }

  get selectedWeek() {
    if (this.weeks.length > 0) {
      return this.weeks.objectAt(this.selectedWeekIndex);
    }
  }

  get showAddWorkoutSessionButton() {
    return this.weeks.length > 0;
  }

  get workoutSessions() {
    if (this.weeks.length > 0) {
      const week = this.selectedWeek;

      if (week) {
        return week.workouts;
      }

      return A();
    }

    return A();
  }

  get isValid() {
    let valid = true;

    if (this.workoutSessions.length === 0) {
      return false;
    }

    this.workoutSessions.forEach((workoutSession) => {
      if (workoutSession.exercises.length < 1) {
        valid = false;
      }

      workoutSession.exercises.forEach((exerciseBlock) => {
        if (exerciseBlock.sets.length < 1) {
          valid = false;
        }

        exerciseBlock.sets.forEach((exerciseSet) => {
          if (exerciseSet.targetReps < 1 || exerciseSet.targetReps === undefined) {
            valid = false;
          }
        });
      });
    });

    return valid;
  }

  get isNotValid() {
    return !this.isValid;
  }

  @action
  addWeek() {
    const week = this.store.createRecord('workout-program-week');

    if (this.weeks.length > 0 ) {
      week.week = this.weeks.lastObject.week + 1;
    } else {
      week.week = 1;
    }

    this.weeks.pushObject(week);
  }

  @action
  removeWeek(weekIndex) {

    this.weeks.removeAt(weekIndex);

    for (var i = 0; i < this.weeks.length; i++) {
      this.weeks.objectAt(i).week = i + 1;
    }
  }

  @action
  async copyWeek(week) {
    const weekCopy = await week.copy({ deep: true })

    weekCopy.week = this.weeks.lastObject.week + 1;


    weekCopy.workouts.forEach((workout) => {
      workout.guid = guidFor(workout);
    });

    this.weeks.pushObject(this.store.createRecord('workout-program-week', weekCopy));
  }

  @action
  async copyWorkoutSession(workoutSession) {
    const workoutSessionCopy = await workoutSession.copy({ deep: true })

    workoutSessionCopy.guid = guidFor(workoutSessionCopy);
    workoutSessionCopy.weekDay = this.selectedWeek.workouts.lastObject.weekDay + 1;

    if (this.selectedWeek) {
      this.selectedWeek.workouts.pushObject(this.store.createRecord('workout-session', workoutSessionCopy));
    }
  }

  @action
  selectWeek(week) {
    this.selectedWeekIndex = week;
  }

  @action
  removeWorkoutBlock(workoutSession, workoutBlock) {
    workoutSession.exercises.removeObject(workoutBlock);
  }

  @action
  addWorkoutProgramSet(workoutBlock) {
    const workoutProgramSet = this.store.createRecord('workout-program-set');

    if (workoutBlock.sets.length > 0) {
      workoutProgramSet.targetReps = workoutBlock.sets.lastObject.targetReps;
    }

    workoutBlock.sets.pushObject(workoutProgramSet);
  }

  @action
  removeWorkoutProgramSet(workoutBlock, workoutProgramSet) {
    workoutBlock.sets.removeObject(workoutProgramSet);
  }

  @action
  addWorkoutSession() {
    const workout = this.store.createRecord('workout-session');

    if (this.workoutSessions.length === 0) {
      workout.weekDay = 1;
    } else {
      workout.weekDay = this.workoutSessions.lastObject.weekDay + 1;
    }

    // workout.id = guidFor(workout);
    workout.guid = guidFor(workout);
    workout.week = this.selectedWeek ? this.selectedWeek.week : 1;

    this.workoutProgram.weeks.objectAt(this.selectedWeekIndex).workouts.pushObject(workout);
  }

  @action
  removeWorkoutSession(workoutSession) {
    this.selectedWeek.workouts.removeObject(workoutSession);
  }

  @action
  async createWorkoutProgram() {
    try {
      await this.workoutProgram.save();

      this.router.transitionTo('workout.my-programs')

    } catch (e) {
      console.log(e);
    }
  }
}
