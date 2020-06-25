import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | workout/new/workout-session/exercise-select', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:workout/new/workout-session/exercise-select');
    assert.ok(route);
  });
});
