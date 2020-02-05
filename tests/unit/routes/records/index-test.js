import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | records/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:records/index');
    assert.ok(route);
  });
});
