import Model, { attr } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";

const validations = {
  exercise: {
    presence: true,
  },
  weight: {
    presence: true,
  },
  reps: {
    presence: true,
  },
  dueDate: {
    presence: true
  },
}

export default class GoalModel extends Model.extend(Validator) {
  @attr() exercise;
  @attr('number') weight;
  @attr('number') reps;
  @attr('boolean', { hasPreviouslyAchievedGoal: false }) hasPreviouslyAchievedGoal;
  @attr('date', { defaultValue: null }) dueDate;
  @attr('date', { defaultValue: null }) completedOn;
  @attr('boolean') isCompleted;
  @attr('number') percentageCompleted;
  validations = validations;
}
