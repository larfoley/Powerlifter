import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | exercises/exercise/records/share', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:exercises/exercise/records/share');
    assert.ok(route);
  });
});
