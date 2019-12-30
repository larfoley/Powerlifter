import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my-network/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-network/index');
    assert.ok(route);
  });
});
