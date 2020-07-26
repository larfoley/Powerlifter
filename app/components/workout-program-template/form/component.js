import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { A } from '@ember/array';

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
      this.workoutProgram = this.store.createRecord('workout-program-template');
      this.workoutProgram.user = this.currentUser.user;

      // const firstWeek = this.store.createRecord('workout-program-week', {
      //   week: 1,
      // })

      // const firstWorkoutSession = this.store.createRecord('workout', {
      //   day: 1,
      //   week: 1,
      //   weekDay: 1
      // });

      // firstWorkoutSession.guid = guidFor(firstWorkoutSession)
      //
      // firstWeek.workouts.pushObject(firstWorkoutSession);

      // this.workoutProgram.weeks.pushObject(firstWeek);

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

    return null;
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

  get allWorkoutSessions() {
    const workouts = A();

    this.weeks.forEach((week) => {
      week.workouts.forEach(workout => workouts.pushObject(workout));
    })

    return workouts;
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
    console.log('copy week');
    const weekCopy = await week.copy({ deep: true })

    weekCopy.week = this.weeks.lastObject.week + 1;

    // Add new guids
    weekCopy.workouts.forEach((workout) => {
      workout.guid = guidFor(workout);
      workout.exercises.forEach((exercise) => {
        exercise.guid = guidFor(exercise);
      });
    });

    this.weeks.pushObject(this.store.createRecord('workout-program-week', weekCopy));
  }

  @action
  async copyWorkoutSession(workoutSession) {
    const workoutSessionCopy = await workoutSession.copy({ deep: true })

    workoutSessionCopy.guid = guidFor(workoutSessionCopy);
    workoutSessionCopy.weekDay = this.selectedWeek.workouts.lastObject.weekDay + 1;

    if (this.selectedWeek) {
      this.selectedWeek.workouts.pushObject(this.store.createRecord('workout', workoutSessionCopy));
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
    const workoutProgramSet = this.store.createRecord('workout-set');
    console.log('creating set from add');

    if (workoutBlock.sets.length > 0) {
      workoutProgramSet.targetReps = workoutBlock.sets.lastObject.targetReps;
      workoutProgramSet.order = workoutBlock.sets.lastObject.order + 1;
    } else {
      workoutProgramSet.order = 1;
    }

    workoutBlock.sets.pushObject(workoutProgramSet);
  }

  @action
  removeWorkoutProgramSet(workoutBlock, workoutProgramSet) {
    workoutBlock.sets.removeObject(workoutProgramSet);
  }

  @action
  addWorkoutSession() {
    console.log('add workout sesison');
    const workout = this.store.createRecord('workout');

    if (this.workoutSessions.length === 0) {
      workout.weekDay = 1;
    } else {
      workout.weekDay = this.workoutSessions.lastObject.weekDay + 1;
    }

    workout.guid = guidFor(workout);
    workout.week = this.selectedWeek ? this.selectedWeek.week : 1;
    this.workoutProgram.weeks.objectAt(this.selectedWeekIndex).workouts.pushObject(workout);
  }

  @action
  removeWorkoutSession(workoutSession) {
    this.selectedWeek.workouts.removeObject(workoutSession);
  }

  @action
  _setWorkoutDays() {
    this.allWorkoutSessions.forEach((workout, i) => {
      workout.day = i + 1;
    });
  }

  @action
  async createWorkoutProgram() {
    this._setWorkoutDays();

    try {
      await this.workoutProgram.save();
      this._removeDirtyProps()
      this.router.transitionTo('workout.my-programs');

    } catch (e) {
      console.error(e);
    }
  }

  @action
  _removeDirtyProps() {
    this.store.peekAll('workout-set').filter(record => {
      if (record.dirtyType === "created") {
        record.unloadRecord();
      }
    });
    this.store.peekAll('workout-program-week').filter(record => {
      if (record.dirtyType === "created") {
        record.unloadRecord();
      }
    });
    this.store.peekAll('workout-block').filter(record => {
      if (record.dirtyType === "created") {
        record.unloadRecord();
      }
    });
    this.store.peekAll('workout').filter(record => {
      if (record.dirtyType === "created") {
        record.unloadRecord();
      }
    });
  }
}
