import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramBaseModel extends Model.extend(Copyable) {
  @attr('string') author;
  @hasMany('workout-program-week') weeks;
  @attr('string') name;
  @attr('boolean', { defaultValue: false }) completed;
  @belongsTo('user') user;
}
