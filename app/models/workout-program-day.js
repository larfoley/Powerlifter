import Model, { attr, hasMany } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramDayModel extends Model.extend(Copyable) {
  @attr('string') day;
  @attr('boolean', { defaultValue: false }) completed;
  @belongsTo('workout') workout;
}
