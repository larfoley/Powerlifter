import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

import Service from '@ember/service';

const currentUserStub = Service.extend({
  // load() {
  //   return new Promise(function(res, rej) {});
  // },
  user: {
    id: 1
  }
})

const sessionStub = Service.extend({
  data: {
    authenticated: {
      access_token: ''
    }
  }
})
// import EmberObject from '@ember/object';

module('Integration | Component | friend-request-button', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function(assert) {
   this.owner.register('service:current-user', currentUserStub);
   // this.owner.register('service:current-user', sessionStub);
 });

  test('correct button text when user is already a friend', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    const store = this.owner.lookup('service:store');

    const userId = store.createRecord('user', {
      isFriend: true
    }).id;

    const user = await store.findRecord('user', userId);

    this.set('user', user);

    await render(hbs`<FriendRequestButton @user={{this.user}} />`);

    assert.equal(this.element.textContent.trim(), 'Friends');
  });

  test('no click handler when user is already a friend', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    const store = this.owner.lookup('service:store')

    const user = store.createRecord('user', {
      isFriend: false
    });

    this.set('user', user);

    await render(hbs`<FriendRequestButton @user={{this.user}} />`);

    await click('[data-test-friend-request-button]')

    assert.equal(this.element.textContent.trim(), 'Friends');
  });
});
