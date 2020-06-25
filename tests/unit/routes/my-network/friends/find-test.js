import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my-network/friends/find', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-network/friends/find');
    assert.ok(route);
  });
});
