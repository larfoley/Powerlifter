import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  records: collection('[data-test-lift-record]', {
    exercise: text('[data-test-lift-record-exercise]'),
    weightLifted: text('[data-test-lift-record-weight-lifted]'),
    reps: text('[data-test-lift-record-reps]'),
  })
};
