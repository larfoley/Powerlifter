import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, typeIn  } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';
import { create } from 'ember-cli-page-object';
import userListDefinition from '../../pages/components/user-list';

const userList = create(userListDefinition)

module('Integration | Component | find-friends', function(hooks) {
  setupRenderingTest(hooks);

  skip('displays search results', async function(assert) {
    const stubResults = A([
      { username: 'bob' },
      { username: 'bobby' }
    ]);

    this.set('findFriends', async () => {
      return new Promise((resolve) => {
        resolve(stubResults)
      })
    });

    this.set('searchUsers', () => {
      alert()
      return new Promise((resolve) => {
        resolve(stubResults)
      })
    });

    this.set('sendFriendRequest', async () => {
    });

    await render(hbs`
      <FindFriends
        @findFriends={{fn this.findFriends}}
        @sendFriendRequest={{fn this.sendFriendRequest}}
      />`
    );

    await typeIn('input', 'bob');

    await settled();

    // await this.pauseTest();

    assert.equal(userList.users.length, 2);
  });
});
