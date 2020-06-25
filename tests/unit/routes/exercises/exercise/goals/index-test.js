import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | exercises/exercise/goals/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:exercises/exercise/goals/index');
    assert.ok(route);
  });
});
