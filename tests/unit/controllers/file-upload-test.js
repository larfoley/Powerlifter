import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | file-upload', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:file-upload');
    assert.ok(controller);
  });
});
