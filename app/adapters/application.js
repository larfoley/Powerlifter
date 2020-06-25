import RESTAdapter from '@ember-data/adapter/rest';
import { computed } from '@ember/object';
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import ENV from '../config/environment';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
const { host } = ENV.APP;

export default class ApplicationAdapter extends RESTAdapter.extend(DataAdapterMixin, {}) {
  host = host;
  sendClientIdAsQueryParam = true;
  coalesceFindRequests = true;

  @computed('session.data.authenticated.token')
  get headers() {
    const headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
}
