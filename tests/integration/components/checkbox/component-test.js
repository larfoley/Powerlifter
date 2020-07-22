import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Checkbox />`);

    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      <Checkbox>
      </Checkbox>
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
