import Model, { attr, belongsTo } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

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
  weightLifted: attr('number'),
  reps: attr('number'),
  isPersonalBest: attr('boolean'),
  videoURL: attr('string'),

  containsVideo: computed('videoURL', function() {
    return isPresent(this.get('videoURL'));
  }),
  validations
});
