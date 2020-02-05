import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | zero-state-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<ZeroStateMessage @message="No Records" @icon="trophy" />`);

    assert.dom('[date-test-zero-state-message]').hasText('No Records');
  });
});
