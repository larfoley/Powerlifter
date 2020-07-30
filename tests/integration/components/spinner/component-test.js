import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | spinner', function(hooks) {
  setupRenderingTest(hooks);

  test('loading', async function(assert) {
    this.set('loading', true);

    await render(hbs`<Spinner @loading=loading/>`);

    assert.equal(this.element.querySelectorAll('[data-test-spinner-icon]').length, 1, 'is spinning');
  });

  test('not loading', async function(assert) {
    this.set('loading', false);

    await render(hbs`<Spinner @loading=loading/>`);

    assert.equal(this.element.querySelectorAll('[data-test-spinner-icon]').length, 0, 'not spinning');
  });
});
