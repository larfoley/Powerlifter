import {
  clickable,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-lift-record-form]',
  submit: clickable('[data-test-lift-record-submit-button]'),
  fillInWeightLifted: fillable('[data-test-weight-lifted-input]')
};
