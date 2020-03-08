import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import Service from '@ember/service';

module('Integration | Component | user-card', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const user = this.server.create('user', { username: 'bob' });
    const currentUserStub = Service.extend({ user })

    this.owner.register('service:current-user', currentUserStub);
  });

  test('button text when user is a friend', async function(assert) {
    const store = this.owner.lookup('service:store');

    const serverUser = this.server.create('user', {
      isFriend: true
    });

    const user = await store.findRecord('user', serverUser.id);

    this.set('user', user);

    await render(hbs`<UserCard @user={{this.user}} />`);

    assert.equal(this.element.querySelector('[data-test-is-friend-button]').textContent.trim(), 'Friends');
  });

  test('sending a friend request', async function(assert) {
    const store = this.owner.lookup('service:store');

    const serverUser = this.server.create('user');

    const user = await store.findRecord('user', serverUser.id);

    this.set('user', user);

    await render(hbs`<UserCard @user={{this.user}} />`);

    await click('button');

    assert.dom('button').hasText('Request Sent');
  });

  test('accepting a friend request', async function(assert) {
    const store = this.owner.lookup('service:store');

    const serverUser = this.server.create('user', {
      friendRequestRecieved: true
    });

    const user = await store.findRecord('user', serverUser.id);

    this.set('user', user);

    await render(hbs`<UserCard @user={{this.user}} />`);

    await click('button');

    assert.dom('button').hasText('Friends');
  });
});
