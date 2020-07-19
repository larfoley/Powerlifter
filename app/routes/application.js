import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  notifications: service(),
  socketIOService: service('socket-io'),
  session: service(),
  flashMessages: service(),
  toast: service(),

  setUpWebSocket() {
    const authToken = this.session.data.authenticated.access_token;
    const socket = this.socketIOService.socketFor(`http://localhost:3000`, {
      query: `auth_token=${authToken}`
    });

    socket.on('error', function(err) {
      console.log(err);
    });

    socket.on('success', function(data) {
      console.log(data);
    })

    socket.on(`notification/${this.currentUser.user.id}`, (data) => {
      this.flashMessages.add({
        message: data.text,
        sticky: true,
      });
      this.notifications.add(data)
    })

    socket.on(`friends/${this.currentUser.user.id}`, (data) => {
      const friend = this.store.peekRecord('friend', data.friend._id);

      friend.isOnline = data.friend.isOnline;

      if (friend.isOnline) {
        this.toast.info(friend.username + " is now online");
      }

    })

    socket.on(`post/${this.currentUser.user.id}`, (post) => {
      // const payload = {
      //   data: {
      //     id: post._id,
      //     type: 'post',
      //     attributes: {
      //       post
      //     }
      //   }
      // }
      //
      // this.store.push(payload)
      console.log(this.get('home'));
    })
  },

  async beforeModel() {
    const user = await this._loadCurrentUser();

    if (this.session.isAuthenticated) {
      await this.notifications.load();
      this.setUpWebSocket.call(this);
    }

    return user;
  },

  async sessionAuthenticated() {
    let _super = this._super;
    await this._loadCurrentUser();

    this.setUpWebSocket.call(this)

    _super.call(this, ...arguments);
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => {
      this.get('session').invalidate()
    });
  }
});
