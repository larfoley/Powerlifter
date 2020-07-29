import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | subtract', function(hooks) {
  setupRenderingTest(hooks);

  test('it subtracts', async function(assert) {
    this.set('a', 2);
    this.set('b', 1);

    await render(hbs`{{subtract a b}}`);

    assert.equal(this.element.textContent.trim(), '1');
  });
});
