import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | equals', function(hooks) {
  setupRenderingTest(hooks);

  test('equality', async function(assert) {
    this.set('x', 1);
    this.set('y', 1);

    await render(hbs`{{equals x y}}`);

    assert.equal(this.element.textContent.trim(), "true");
  });

  test('inequality', async function(assert) {
    this.set('x', 1);
    this.set('y', 2);

    await render(hbs`{{equals x y}}`);

    assert.equal(this.element.textContent.trim(), "false");
  });
});
