import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import signUpPage from '../pages/sign-up';

module('Acceptance | sign up', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /sign-up when authenticated should redirect to /home', async function(assert) {

    await authenticateSession({
      access_token: '12345',
      token_type: "bearer"
    });

    await signUpPage.visit();

    assert.equal(currentURL(), '/home');
  });

  test('signing up', async function(assert) {
    const { signUpForm } = signUpPage;

    await signUpPage.visit();

    assert.equal(currentURL(), '/sign-up');

    assert.ok(signUpForm.isPresent);

    await signUpForm
      .fillInUserName('bob')
      .fillInEmail('bob@test.com')
      .fillInPassword('bob123');

    await signUpForm.submit();

    assert.equal(currentURL(), '/sign-in');
  });

});
