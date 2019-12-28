import {
  hasClass,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-navbar-tabs]',
  links: collection('a', {
    isActive: hasClass('active', { at: 0 }),
  })
};
