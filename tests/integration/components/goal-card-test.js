import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | goal-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    const store = this.owner.lookup('service:store');

    const serverGoal = this.server.create('goal', {
      exercise: { name: 'Deadlift' },
      weight: 200,
      reps: 1,
    });

    const goal = await store.findRecord('goal', serverGoal.id);

    this.set('goal', goal);

    await render(hbs`<GoalCard @goal={{this.goal}} />`);

    assert.equal(this.element.querySelector('[data-test-exercise]').textContent.trim(), 'Deadlift', 'Exercise is displayed');
    assert.equal(this.element.querySelector('[data-test-weight]').textContent.trim(), "200kg", 'Weight is displayed');
    assert.equal(this.element.querySelector('[data-test-reps]').textContent.trim(), "1 Rep", 'Reps are displayed');
  });

  test('completing a goal', async function(assert) {
    const store = this.owner.lookup('service:store');

    const serverGoal = this.server.create('goal', {
      exercise: { name: 'Deadlift' },
      weight: 200,
      reps: 1,
    });

    const goal = await store.findRecord('goal', serverGoal.id);

    this.set('goal', goal);

    await render(hbs`<GoalCard @goal={{this.goal}} />`);
    await click('[data-test-exercise-status]')

    assert.ok(this.element.querySelector('[data-test-goal-card]').classList.contains('goal-card--completed'), 'Goal status updated');
    assert.ok(goal.completed, 'Goal is completed');
  });
});
