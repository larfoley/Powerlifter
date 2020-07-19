import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | confirm-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('onConfirm', function(val) { });
    this.set('onCancel', function(val) { });

    await render(hbs`
      <ConfirmModal
        @onConfirm={{this.onConfirm}}
        @onCancel={{this.onCancel}}
        @title="Hello"
      />`);

    assert.equal(this.element.querySelector('[data-test-confirm-modal-title]').textContent.trim(), 'Hello');
  });
});
