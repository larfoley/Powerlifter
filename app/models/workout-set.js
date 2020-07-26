import Model, { attr, belongsTo } from '@ember-data/model';
import Copyable from 'ember-data-copyable';
import { typeOf } from '@ember/utils';
import Validator from "ember-model-validator/mixins/object-validator";

export default class WorkoutProgramSetModel extends Model.extend(Copyable).extend(Validator) {
  @attr('number') order;
  @belongsTo('workout-block') workoutBlock;
  @attr('number') targetReps;
  @attr('number') repsCompleted;
  @attr('number') weightLifted;
  @attr('boolean', { defaultValue: false }) completed;

  get completedSuccessfully() {
    const repsCompleted = parseInt(this.repsCompleted, 10);
    const targetReps = parseInt(this.targetReps, 10);

    return (targetReps !== NaN && repsCompleted !== NaN) && (repsCompleted >= targetReps)
  }

  get isNotValid() {
    const weight = this.weightLifted;
    const reps = this.repsCompleted;

    if (typeOf(reps) === "string") {
      if (reps.trim().length === 0) {
        return true;
      }
    }

    if (typeOf(reps) === 'null' || typeOf(weight) === 'null') {
      return true;
    }


    return (reps < 0) || (weight < 0);
  }

  validations = {
    weightLifted: {
      length: {
        minimum: 1,
      }
    }
  }
}
