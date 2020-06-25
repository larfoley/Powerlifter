import Model, { attr, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramWeekModel extends Model.extend(Copyable) {
  @attr('number') week;
  @attr('boolean', { defaultValue: false }) completed;
  @hasMany('workout-session') workouts;
}
