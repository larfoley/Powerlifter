import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import homePage from '../pages/home';

const { appNavbar } =  homePage;

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /home', async function(assert) {
    await authenticateSession();

    await homePage.visit();

    assert.equal(currentURL(), '/home');
  });

  test('Navigating to the home page', async function(assert) {
    await authenticateSession();

    await homePage.visit();

    await appNavbar.homeLink();

    assert.equal(currentURL(), '/home');
  });

  test('Navigating to the goals page', async function(assert) {
    await authenticateSession();

    await homePage.visit();

    await appNavbar.goalsLink();

    assert.equal(currentURL(), '/goals');
  });
});
