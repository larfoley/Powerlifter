import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class WorkoutService extends Service {
  @service currentUser;
  @service store;

  @tracked _currentWorkoutProgram;

  constructor() {
    super(...arguments);

    this._currentWorkoutProgram = this.currentUser.user.workoutHistory.find((workout) => {
      return workout.isActive;
    })
  }

  get hasActiveWorkoutProgram() {
    return isPresent(this.currentWorkoutProgram);
  }

  get currentWorkoutProgram() {
    return this._currentWorkoutProgram;
  }

  set currentWorkoutProgram(newWorkoutProgram) {
    this._currentWorkoutProgram = newWorkoutProgram;
  }

  @action
  async activateProgram(workoutProgramTemplate) {

    if (this.hasActiveWorkoutProgram) {
      this.currentWorkoutProgram.isActive = false;

      await this.currentWorkoutProgram.save();
      this.currentWorkoutProgram = null;
    }

    const workoutProgram = await this._convertWorkoutProgramTemplateToWorkoutProgram(workoutProgramTemplate);
    await workoutProgram.save();

    this._currentWorkoutProgram = workoutProgram;
  }

  async _convertWorkoutProgramTemplateToWorkoutProgram(workoutProgramTemplate) {

    const workoutProgram = this.store.createRecord('workout-program', {
      author: workoutProgramTemplate.author,
      name: workoutProgramTemplate.name,
      isActive: true,
      startedOn: new Date(),
      user: this.currentUser.user,
    });

    const workoutProgramTemplateCopy = await workoutProgramTemplate.copy({ deep: false });
    const serializedWorkoutProgramTemplate = workoutProgramTemplateCopy.serialize();

    workoutProgramTemplateCopy.weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        if (workout) {
          workout.unloadRecord()
        }
        if (workout) {
          workout.exercises.forEach((exercise) => {
            if (exercise) {
              exercise.unloadRecord()
            }
            exercise.sets.forEach((workoutSet) => {
              if (workoutSet) {
                workoutSet.unloadRecord()
              }
            });
          });
        }
      });
    });
    workoutProgramTemplateCopy.unloadRecord();

    serializedWorkoutProgramTemplate.weeks.forEach((week) => {
      const workoutProgramWeek = this.store.createRecord('workout-program-week', {
        week: week.week
      });

      week.workouts.forEach((workout) => {
        const workoutProgramSession = this.store.createRecord('workout-session', {
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
            const workoutProgramSet = this.store.createRecord('workout-program-set', workoutSet);

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
}
