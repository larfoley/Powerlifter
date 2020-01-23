import {
  text,
  fillable,
  clickable
} from 'ember-cli-page-object';

export default {
  title: text('h1'),
  submit: clickable('[data-test-submit-button]'),
  fillInUserName: fillable('[data-test-username]'),
  fillInEmail: fillable('[data-test-email]'),
  fillInPassword: fillable('[data-test-password]')
};
