import Model, { attr, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutSessionModel extends Model.extend(Copyable) {
  @attr('number') week;
  @attr('number') weekDay;
  @hasMany('workout-block') exercises;
  @attr('boolean', { defaultValue: false }) completed;
  @attr('string') guid;

  get everyWorkoutBlockIsCompleted() {
    return this.exercises.every(workoutBlock => workoutBlock.everySetIsCompleted);
  }
}
