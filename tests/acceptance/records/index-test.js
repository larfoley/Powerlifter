import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import recordsPage from '../../pages/records/index';

module('Acceptance | records/index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('redirect unauthenticated user to the sign in page', async function(assert) {
    await recordsPage.visit();

    assert.equal(currentURL(), '/sign-in');
  });

  test('visiting /records', async function(assert) {
    await authenticateSession();
    await recordsPage.visit();

    assert.equal(currentURL(), '/records');
  });

  test('navigating to the new record page', async function(assert) {
    await authenticateSession();
    await recordsPage.visit().newRecordLink();

    assert.equal(currentURL(), '/records/new');
  });

  test('lift records are displayed', async function(assert) {
    this.server.createList('lift-record', 3);

    await authenticateSession();

    await recordsPage.visit();

    assert.equal(recordsPage.liftRecords.records.length, 3);
  });
});
