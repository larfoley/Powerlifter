import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import newGoalPage from '../../pages/goals/new';
import editGoalPage from '../../pages/goals/edit';
import { selectChoose, selectSearch } from 'ember-power-select/test-support';
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';

module('Acceptance | goals/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /goals/new when authenticated', async function(assert) {
    await authenticateSession();

    await newGoalPage.visit()

    assert.equal(currentURL(), '/goals/new');
  });

  test('visiting /goals/new when un authenticated', async function(assert) {
    await visit('/goals/new');

    assert.equal(currentURL(), '/sign-in');
  });

  test('creating a goal', async function(assert) {
    await authenticateSession();

    this.server.create('exercise', {
      name: 'Deadlift'
    })

    this.server.create('exercise', {
      name: 'Squat'
    })

    await newGoalPage.visit();


    await selectChoose('.reps-selector', 1);
    await selectSearch('.exercise-selector', 'Deadlift');
    await selectChoose('.exercise-selector', 'Deadlift');

    setFlatpickrDate('[data-test-goal-date]', new Date());

    await newGoalPage.createOrEditGoalForm
      .fillInWeight(100)
      .submit();

    assert.equal(currentURL(), '/goals');
    assert.equal(newGoalPage.goalList.goals.length, 1, 'Goals list updated')
    assert.equal(newGoalPage.goalList.goals[0].exercise, 'Deadlift', 'Correct exercise')
  });

  test('editing a goal', async function(assert) {
    await authenticateSession();

    const goal = this.server.create('goal', {
      exercise: 'Deadlift'
    })

    await editGoalPage.visit({ goal_id: goal.id});

    await editGoalPage.createOrEditGoalForm.submit();

    assert.equal(currentURL(), `/goals/${goal.id}/edit`);
  });
});
