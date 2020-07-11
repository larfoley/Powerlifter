import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Copyable from 'ember-data-copyable';
import { A } from '@ember/array';

export default class WorkoutProgramBaseModel extends Model.extend(Copyable) {
  @attr('string') author;
  @hasMany('workout-program-week') weeks;
  @attr('string') name;
  @attr('boolean', { defaultValue: false }) completed;
  @belongsTo('user') user;

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
    // return this.weeks.length
    return 0
  }
}
