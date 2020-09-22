import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import goalComponentDefinition from 'powerlifting/tests/pages/components/goal-list/goal/component';
import { create } from 'ember-cli-page-object';
const goalObject = create(goalComponentDefinition);

const goal =  EmberObject.create({
  isCompleted: false,
  weight: 100,
  reps: 1,
  dueDate: new Date()
})

const newGoal =  EmberObject.create({
  id: 1,
  isCompleted: false,
  weight: 100,
  reps: 1,
  dueDate: new Date()
})

module('Integration | Component | goal-list/goal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('goal', goal);

    await render(hbs`<GoalList::Goal @goal={{goal}} />`);

    assert.ok(this.element);
  });

  test('Confirm modal is shown when marking a goal complete', async function(assert) {
    goal.save = sinon.stub().resolves({ goal: goal });

    this.set('goal', goal);

    await render(hbs`<GoalList::Goal @goal={{goal}} />`);

    await click('[data-test-goal-checkbox]');

    assert.ok(this.element.querySelector('.ember-modal-dialog'), 'confirm modal is shown');
  });

  test('Completed goal should disable checkbox', async function(assert) {
    const saveGoalStub = sinon.spy()
    goal.save = saveGoalStub;

    this.set('goal', goal);

    await render(hbs`<GoalList::Goal @goal={{goal}} />`);

    await click('[data-test-goal-checkbox]');
    await click('.ember-modal-dialog .primary-button');

    assert.ok(goal.save.calledOnce);

    assert.ok(this.element.querySelector('.square--success'), 'confirm modal is shown');
  });
});
