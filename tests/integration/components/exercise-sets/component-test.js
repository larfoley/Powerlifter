import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | exercise-sets', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<ExerciseSets />`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
