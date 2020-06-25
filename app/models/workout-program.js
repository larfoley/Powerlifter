import Model, { attr, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramModel extends Model.extend(Copyable) {
  @attr('string') author;
  @hasMany('workout-program-week') weeks;
  @attr('string') name;
  @attr('boolean', { defaultValue: false }) completed;
}
