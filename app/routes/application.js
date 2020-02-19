import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  notifications: service(),

  beforeModel() {
    this.notifications.load();
    return this._loadCurrentUser();
  },

  async sessionAuthenticated() {
    let _super = this._super;
    await this._loadCurrentUser();
    _super.call(this, ...arguments);
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => {
      this.get('session').invalidate()
    });
  }
});
