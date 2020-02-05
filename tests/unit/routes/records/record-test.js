import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | records/record', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:records/record');
    assert.ok(route);
  });
});
