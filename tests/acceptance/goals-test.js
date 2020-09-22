import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession } from 'ember-simple-auth/test-support';
import goalsPage from '../pages/goals/index';

module('Acceptance | goals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession();
  })

  test('visiting /goals', async function(assert) {
    assert.equal(currentURL(), '/goals');
  });

  test('goals are displayed', async function(assert) {
    const goalList = this.server.createList('goal', 2);
    await goalsPage.visit();

    assert.equal(goalsPage.goals.length, goalList.length);
  });

  test('mark goal complete', async function(assert) {
    this.server.create('goal');

    await goalsPage.visit();

    await goalsPage.goals.objectAt(0).clickCompleteGoalCheckbox();

    await goalsPage.confirmCompleteGoal();

    assert.ok(this.server.db.goals[0].isCompleted);
  });
});
