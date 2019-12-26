import RESTAdapter from '@ember-data/adapter/rest';
import { computed } from '@ember/object';
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

export default RESTAdapter.extend(DataAdapterMixin, {
  host: 'http://localhost:3000',
  headers: computed('session.data.authenticated.token', function() {
    const headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  })
});
