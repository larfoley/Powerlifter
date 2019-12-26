import Model, { attr } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";

const validations = {
  username: {
    presence: true,
  },
  email: {
    presence: true,
  },
  password: {
    presence: true,
  }
}

export default Model.extend(Validator, {
  username: attr('string'),
  email: attr('string'),
  password: attr('string'),
  confirmPassword: attr('string'),
  validations
});
