import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | goals/due', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:goals/due');
    assert.ok(route);
  });
});
