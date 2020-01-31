import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | goals/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:goals/edit');
    assert.ok(route);
  });
});
