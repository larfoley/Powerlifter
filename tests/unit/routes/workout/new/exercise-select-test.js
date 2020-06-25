import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | workout/new/exercise-select', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:workout/new/exercise-select');
    assert.ok(route);
  });
});
