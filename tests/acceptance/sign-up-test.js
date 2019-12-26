import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | sign up', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-up when authenticated should redirect to /home', async function(assert) {

    await authenticateSession({
      authToken: '12345',
      otherData: 'some-data'
    });

    await visit('/sign-up');

    assert.equal(currentURL(), '/home');
  });

  test('succesfully create account', async function(assert) {
    await visit('/sign-up');

    assert.equal(currentURL(), '/sign-up');

    await this.pauseTest();

    assert.ok(0)

  });

});
