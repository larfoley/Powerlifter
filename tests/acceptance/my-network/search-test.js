import { module, skip } from 'qunit';
import { typeIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import searchPage from '../../pages/my-network/search';
import friendRequestsPage from '../../pages/my-network/friend-requests';

module('Acceptance | my network/search', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  skip('searching for a user', async function(assert) {
    await authenticateSession();

    const username = 'john';

    this.server.create('user', { username });

    await searchPage.visit();

    await typeIn('[data-test-find-friends] input', username );

    assert.equal(searchPage.userList.users.length, 1, 'user found');
    assert.equal(searchPage.userList.users[0].username, 'john', 'username is displayed');
  });

  skip('searching for a user that does not exist', async function(assert) {
    await authenticateSession();
    const username = 'john';

    await searchPage.visit();

    await typeIn('[data-test-find-friends] input', username );

    assert.equal(searchPage.userList.users.length, 0, 'no users found');
  });

  skip('sending a friend request', async function(assert) {
    await authenticateSession();
    const username = 'john';

    this.server.create('user', { username });

    await searchPage.visit();

    await typeIn('[data-test-find-friends] input', username);

    await searchPage.userList.users[0].sendFriendRequest();

    await friendRequestsPage.visit();

    assert.equal(friendRequestsPage.userList.users.length, 1, 'friend request sent');
  });

});
