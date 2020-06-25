import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | my-network/friends/find', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:my-network/friends/find');
    assert.ok(controller);
  });
});
