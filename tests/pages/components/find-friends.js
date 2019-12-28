import {
  triggerable,
  fillable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-find-friends]',
  fillIn: fillable('[data-test-search-friends-input]'),
  keydown: triggerable('keypress', '[data-test-search-friends-input]', { eventProperties: { keyCode: 13 }})
};
