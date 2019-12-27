import {
  clickable,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-sign-up]',
  submit: clickable('[data-test-submit-button]'),
  fillInUserName: fillable('[data-test-username] input'),
  fillInEmail: fillable('[data-test-email] input'),
  fillInPassword: fillable('[data-test-password] input')
};
