import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-goal-list]',
  goals: collection('[data-test-goal-card]', {
    exercise: text('[data-test-exercise]'),
    dueDate: text('[data-test-due-date]'),
  })
};
