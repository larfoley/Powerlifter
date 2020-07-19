import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-goals-list]',
  goals: collection('[data-test-goals-item]', {
    exercise: text('[data-test-exercise]'),
    dueDate: text('[data-test-due-date]'),
  })
};
