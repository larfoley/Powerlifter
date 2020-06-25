import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | workout session', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('workout-session');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('workout-session', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
