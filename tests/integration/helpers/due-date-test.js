import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | due-date', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it converts date', async function(assert) {
    const date = new Date();

    this.set('inputValue', date);

    await render(hbs`{{due-date inputValue}}`);

    assert.equal(this.element.textContent.trim(), date.toLocaleDateString());
  });
});
