import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | floating-action-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<FloatingActionButton @text="Hello"/>`);

    assert.equal(this.element.textContent.trim(), 'Hello');
  });
});
