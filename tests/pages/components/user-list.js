import {
  collection,
  clickable,
  text
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-user-list]',
  users: collection('[data-test-user-item]', {
    username: text('[data-test-user-item-username]'),
    sendFriendRequest: clickable('[data-test-user-item-add-friend-button]')
  })
};
