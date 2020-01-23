import {
  collection,
  clickable,
  text
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-user-list]',
  users: collection('[data-test-user-card]', {
    username: text('[data-test-user-card-username]'),
    sendFriendRequest: clickable('[data-test-friend-request-button]'),
    acceptFriendRequest: clickable('[data-test-accept-friend-request-button]')
  })
};
