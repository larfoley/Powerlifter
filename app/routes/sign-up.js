import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('user')
  },

  actions: {
    willTransition() {
      this.store.peekAll('branch').forEach((branch) => {
        if (branch.get('isNew')) {
          branch.rollbackAttributes()
        }
      });
    }
  }
});
