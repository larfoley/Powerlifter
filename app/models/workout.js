import Model, { attr, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutModel extends Model.extend(Copyable) {
  @attr('number') day;
  @attr('number') week;
  @attr('number') weekDay;
  @hasMany('workout-block') exercises;
  @attr('boolean', { defaultValue: false }) completed;
  @attr('string') guid;
  @attr({ defaultValue() { return []}}) goalsAchieved;
  @attr({ defaultValue() { return []}}) personalBestsAchieved;

  get everyWorkoutBlockIsCompleted() {
    return this.exercises.every(workoutBlock => workoutBlock.everySetIsCompleted);
  }
}
