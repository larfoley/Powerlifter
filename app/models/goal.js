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
  }
}

export default Model.extend(Validator, {
  exercise: attr(),
  weight: attr('number'),
  reps: attr('number'),
  done: attr('boolean'),
  dueDate: attr('date', { defaultValue: null }),
  completed: attr('boolean'),
  validations
});
