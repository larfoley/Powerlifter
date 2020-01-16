import { module, test } from 'qunit';
import { typeIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import page from '../../pages/my-network/search';

module('Acceptance | my network/search', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('searching for a friend to add displays a list of users', async function(assert) {
    await authenticateSession({ access_token: '12345', token_type: "bearer" });
    const username = 'john';

    this.server.create('user', { username });

    await page.visit();

    await typeIn('[data-test-find-friends] input', username );

    assert.equal(page.userList.users.length, 1);
  });

  test('searching for a friend with 0 results', async function(assert) {
    await authenticateSession({ access_token: '12345', token_type: "bearer" });
    const username = 'john';

    await page.visit();

    await typeIn('[data-test-find-friends] input', username );

    assert.equal(page.userList.users.length, 0);
  });

  test('sending a friend request', async function(assert) {
    await authenticateSession({ access_token: '12345', token_type: "bearer" });
    this.server.create('user', { username: 'john' });
    this.server.create('user', { username: 'jane' });

    await page.visit();

    await typeIn('[data-test-find-friends] input', 'john' );

    await this.pauseTest();

    assert.equal(page.userList.users[0].username, 'john');
  });
});
