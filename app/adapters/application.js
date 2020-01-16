import RESTAdapter from '@ember-data/adapter/rest';
import { computed } from '@ember/object';
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import ENV from '../config/environment';

const { host } = ENV.APP;

export default RESTAdapter.extend(DataAdapterMixin, {
  host,

  headers: computed('session.data.authenticated.token', function() {
    const headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }),
});

// import Controller from '@ember/controller';
// import { action } from '@ember/object'
// import { inject as service } from '@ember/service';
// import { tracked } from '@glimmer/tracking';
// import { computed } from '@ember/object';
//
// export default class ApplicationAdapter extends RESTAdapter.extend(DataAdapterMixin, {}) {
//   host = 'http://localhost:3000';
//   sendClientIdAsQueryParam = true;
//
//   @action
//   @computed('session.data.authenticated.token')
//   get headers() {
//     const headers = {};
//     if (this.session.isAuthenticated) {
//       headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
//     }
//
//     return headers;
//   }
// }
