import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

const goals = A([
  EmberObject.create({ isCompleted: true, weight: 100, reps: 1, dueDate: new Date() })
])

module('Integration | Component | goal-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders all goals', async function(assert) {
    this.set('goals', goals);

    await render(hbs`<GoalList @goals={{goals}} />`);

    assert.equal(
      this.element.querySelectorAll('[data-test-goals-item]').length,
      goals.length,
      'All goals have rendered'
    );
  });
});
