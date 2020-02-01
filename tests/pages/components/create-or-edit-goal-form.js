import {
  clickable,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-create-or-edit-goal-form]',
  submit: clickable('[data-test-submit-button]'),
  fillInWeight: fillable('[data-test-weight]'),
};
