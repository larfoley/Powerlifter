import { module, test, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import friendRequestsPage from '../../pages/my-network/friend-requests';
import friendsPage from '../../pages/my-network/friends';

module('Acceptance | my-network/friend-requests', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('redirect unauthenticated user to the sign in page', async function(assert) {
    await friendRequestsPage.visit();

    assert.equal(currentURL(), '/sign-in');
  });

  test('friends requests are displayed', async function(assert) {
    await authenticateSession();

    this.server.createList('user', 2);
    this.server.createList('friendRequest', 3);

    await friendRequestsPage.visit();

    assert.equal(currentURL(), '/my-network/friend-requests');
    assert.equal(friendRequestsPage.userList.users.length, 3, 'user found');
  });

  skip('accepting a friend request', async function(assert) {
    await authenticateSession();

    let user = this.server.create('friendRequest', {
      friendRequestRecieved: 'pending'
    });

    await friendRequestsPage.visit();

    assert.equal(currentURL(), '/my-network/friend-requests');

    await friendRequestsPage.userList.users[0].acceptFriendRequest();

    user = await this.server.schema.users.find(user.id);

    assert.ok(user.isFriend, 'friend request accepted');

    await friendsPage.visit();

    assert.equal(friendsPage.userList.users.length, 1, 'friends page updated');
    assert.equal(friendsPage.userList.users[0].username, user.username, 'correct friend displayed');
  });
});
