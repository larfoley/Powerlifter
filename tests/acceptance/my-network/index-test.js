import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import myNetworkPage from '../../pages/my-network/index';

module('Acceptance | my network/index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /my-network/index', async function(assert) {
    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await myNetworkPage.visit();

    assert.equal(currentURL(), '/my-network/feed');
  });
});
