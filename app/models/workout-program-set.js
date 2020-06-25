import Model, { attr, belongsTo } from '@ember-data/model';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramSetModel extends Model.extend(Copyable) {
  @attr('number') number;
  @belongsTo('workout-block') workoutBlock;
  @attr('number') targetReps;
  @attr('number') repsCompleted;
  @attr('number') weightLifted;
  @attr('boolean', { defaultValue: false }) completed;
}
