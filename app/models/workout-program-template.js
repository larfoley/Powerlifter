import WorkoutProgramBaseModel from './workout-program-base';
import Copyable from 'ember-data-copyable';
import { A } from '@ember/array';

export default class WorkoutProgramTemplateModel extends WorkoutProgramBaseModel.extend(Copyable) {
  get exercises() {
    const exercises = A();

    this.weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workout.exercises.forEach(({ exercise }) => {
          if (!exercises.includes(exercise)) {
            exercises.pushObject(exercise);
          }
        })
      });
    });

    return exercises;
  }

  get duration() {
    return this.weeks.length
  }
}
