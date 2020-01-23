import { module, test, skip } from 'qunit';
import { currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentSession, authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import signInPage from '../pages/sign-in';

module('Acceptance | sign in', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-in when authenticated should redirect to /home', async function(assert) {
    await authenticateSession();

    await signInPage.visit();

    assert.equal(currentURL(), '/home');
  });

  test('succesfully signing in', async function(assert) {
    await signInPage.visit();

    const accessToken = '2YotnFZFEjr1zCsicMWpAA';
    const tokenType = 'bearer';

    this.server.post('/token', () => {
      return {
        "access_token": accessToken,
        "token_type": tokenType,
      }
    })

    assert.equal(currentURL(), '/sign-in');

    await click('button');
    assert.dom('#toast-container', document).includesText('Signed in');

    const sessionData = currentSession().get('data.authenticated');

    assert.equal(sessionData.access_token, accessToken);
    assert.equal(sessionData.token_type, tokenType);
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
