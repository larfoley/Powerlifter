import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | workout/my-programs/new/edit-exercise', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:workout/my-programs/new/edit-exercise');
    assert.ok(route);
  });
});
