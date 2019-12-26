import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | sign up', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-up when authenticated should redirect to /home', async function(assert) {

    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await visit('/sign-up');

    assert.equal(currentURL(), '/home');
  });

});
