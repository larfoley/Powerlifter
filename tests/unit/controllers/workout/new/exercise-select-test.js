import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | workout/new/exercise-select', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:workout/new/exercise-select');
    assert.ok(controller);
  });
});
