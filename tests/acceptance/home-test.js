import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import homePage from '../pages/home';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /home', async function(assert) {

    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });
    
    await homePage.visit();

    assert.equal(currentURL(), '/home');
  });
});
