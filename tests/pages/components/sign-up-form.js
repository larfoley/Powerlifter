import {
  clickable,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-sign-up]',
  submit: clickable('[data-test-submit-button]'),
  fillInUserName: fillable('[data-test-username]'),
  fillInEmail: fillable('[data-test-email]'),
  fillInPassword: fillable('[data-test-password]')
};
