import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | sign in', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-in when authenticated should redirect to /home', async function(assert) {

    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await visit('/sign-in');

    assert.equal(currentURL(), '/home');
  });

  test('succesfully signing in', async function(assert) {
    await visit('/sign-in');

    assert.equal(currentURL(), '/sign-in');

    await click('button');
    assert.dom('#toast-container', document).includesText('Signed in')

  });


});
