import Model, { attr, belongsTo } from '@ember-data/model';
import Copyable from 'ember-data-copyable';
import { typeOf } from '@ember/utils';

export default class WorkoutProgramSetModel extends Model.extend(Copyable) {
  @attr('number') order;
  @belongsTo('workout-block') workoutBlock;
  @attr('number') targetReps;
  @attr('number') repsCompleted;
  @attr('number') weightLifted;
  @attr('boolean', { defaultValue: false }) completed;

  get isNotValid() {
    const weight = this.weightLifted;
    const reps = this.repsCompleted;

    if (typeOf(reps) === 'null' || typeOf(weight) === 'null') {
      return true;
    }

    return (reps < 0) || (weight < 0);
  }
}
