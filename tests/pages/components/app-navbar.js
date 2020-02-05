import {
  clickable,
} from 'ember-cli-page-object';

export default {
  homeLink: clickable('[data-test-home-link]'),
  recordsLink: clickable('[data-test-records-link]'),
  goalsLink: clickable('[data-test-goals-link]'),
  myNetworkLink: clickable('[data-test-my-network-link]'),
};
