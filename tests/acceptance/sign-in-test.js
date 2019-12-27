import { module, test, skip } from 'qunit';
import { currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import signInPage from '../pages/sign-in';

module('Acceptance | sign in', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-in when authenticated should redirect to /home', async function(assert) {

    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await signInPage.visit();

    assert.equal(currentURL(), '/home');
  });

  test('succesfully signing in', async function(assert) {
    await signInPage.visit();

    assert.equal(currentURL(), '/sign-in');

    await click('button');
    assert.dom('#toast-container', document).includesText('Signed in')

  });

  // BUG: ember simple auth will not logout
  skip('signing out', async function(assert) {
    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    const { signOutButton } = signInPage

    await signInPage.visit();

    assert.equal(currentURL(), '/home');

    assert.ok(signOutButton.isPresent);

    await signOutButton.click();

    assert.equal(currentURL(), '/sign-in');
  });
});
