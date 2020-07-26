import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutBlockModel extends Model.extend(Copyable) {
  @belongsTo('workout') workoutSession;
  @attr('string') exercise;
  @hasMany('workout-set') sets;
  @attr('string') note;
  @attr('string') guid;

  get everySetIsCompleted() {
    return this.sets.every(exerciseSet => exerciseSet.completed);
  }
}
