import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | workout/my-programs/my-program', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:workout/my-programs/my-program');
    assert.ok(controller);
  });
});
