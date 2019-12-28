import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import page from '../../pages/my-network/search';

module('Acceptance | my network/search', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /my-network/search', async function(assert) {
    await authenticateSession({ access_token: '12345', token_type: "bearer" });

    await page.visit();

    await find('selector');

    assert.equal(currentURL(), '/my-network/search');
  });
});
