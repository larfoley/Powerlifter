import Model, { attr } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";

const validations = {
  exercise: {
    presence: true,
  },
  weightLifted: {
    presence: true,
  },
  reps: {
    presence: true,
  },
  date: {
    presence: true
  }
}

export default Model.extend(Validator, {
  exercise: attr(),
  date: attr('date', { defaultValue: null }),
  weightLifted: attr('string'),
  reps: attr('number'),
  validations
});
