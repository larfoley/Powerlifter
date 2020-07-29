import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class WorkoutService extends Service {
  @service currentUser;
  @service store;
  @tracked user;
  @tracked _currentWorkoutProgram;

  constructor() {
    super(...arguments);

    this.user = this.currentUser.user;
  }

  get hasActiveWorkoutProgram() {
    return isPresent(this.currentWorkoutProgram);
  }

  get currentWorkoutProgram() {
    if (this._currentWorkoutProgram) {
      return this._currentWorkoutProgram
    }

    if (this.user) {
      return this.user.workoutHistory.find((workout) => {
        return workout.isActive;
      })
    }

    return null;
  }

  set currentWorkoutProgram(program) {
    this._currentWorkoutProgram = program;
  }

  get daysCompleted() {
    const workoutSessions = A();
    const weeks = this.workout.currentWorkoutProgram.weeks;

    weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workoutSessions.pushObject(workout);
      });
    });

    return workoutSessions.filter((w) => w.completed).length
  }

  @action
  async activateProgram(workoutProgramTemplate) {

    if (this.hasActiveWorkoutProgram) {
      const currentWorkoutProgram = this.currentWorkoutProgram;

      this.currentWorkoutProgram.isActive = false;

      await currentWorkoutProgram.save();

      this.currentWorkoutProgram = null;
    }

    const workoutProgram = await this._convertWorkoutProgramTemplateToWorkoutProgram(workoutProgramTemplate);

    workoutProgram.startedOn = new Date();
    await workoutProgram.save();

    this._removeDirtyProps()

    this.currentWorkoutProgram = workoutProgram;
  }

  async _convertWorkoutProgramTemplateToWorkoutProgram(workoutProgramTemplate) {

    const workoutProgram = this.store.createRecord('workout-program', {
      author: workoutProgramTemplate.author,
      name: workoutProgramTemplate.name,
      isActive: true,
      startedOn: new Date(),
      user: this.currentUser.user,
    });

    const serializedWorkoutProgramTemplate = workoutProgramTemplate.serialize();

    serializedWorkoutProgramTemplate.weeks.forEach((week) => {
      const workoutProgramWeek = this.store.createRecord('workout-program-week', {
        week: week.week
      });

      week.workouts.forEach((workout) => {
        const workoutProgramSession = this.store.createRecord('workout', {
          week: workout.week,
          weekDay: workout.weekDay,
          day: workout.day
        });

        workout.exercises.forEach((workout) => {
          const workoutProgramBlock = this.store.createRecord('workout-block', {
            exercise: workout.exercise,
            note: workout.note
          });

          workout.sets.forEach((workoutSet) => {
            const workoutProgramSet = this.store.createRecord('workout-set', workoutSet);

            workoutProgramBlock.sets.pushObject(workoutProgramSet)
          });

          workoutProgramSession.exercises.pushObject(workoutProgramBlock);
        });

        workoutProgramWeek.workouts.pushObject(workoutProgramSession)

      });

      workoutProgram.weeks.pushObject(workoutProgramWeek)
    });

    return workoutProgram;
  }

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
