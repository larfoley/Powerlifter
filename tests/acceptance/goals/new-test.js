import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import page from '../../pages/goals/new';

module('Acceptance | goals/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /goals/new', async function(assert) {
    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await page.visit()

    assert.equal(currentURL(), '/goals/new');
  });

  test('visiting /goals/new', async function(assert) {
    await visit('/goals/new');

    assert.equal(currentURL(), '/goals/new');
  });
});
