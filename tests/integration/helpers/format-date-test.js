import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-date', function(hooks) {
  setupRenderingTest(hooks);

  test('date is formated', async function(assert) {
    const date = new Date();

    this.set('inputValue', date);

    await render(hbs`{{format-date inputValue}}`);

    assert.equal(this.element.textContent.trim(), date.toLocaleDateString(), 'Date is formated');
  });
});
