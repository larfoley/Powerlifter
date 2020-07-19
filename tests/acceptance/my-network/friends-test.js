import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, find } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import friendsPage from '../../pages/my-network/friends';

module('Acceptance | my network/friends', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('redirect unauthenticated user to the sign in page', async function(assert) {
    await friendsPage.visit();

    assert.equal(currentURL(), '/sign-in');
  });

  test('friends list is displayed', async function(assert) {
    await authenticateSession();

    this.server.createList('friend', 3);

    await friendsPage.visit();

    assert.equal(currentURL(), '/my-network/friends');

    assert.equal(this.element.querySelectorAll('[data-test-friend]').length, 3, 'user found');
  });
});
