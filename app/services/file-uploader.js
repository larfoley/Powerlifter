import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const { host } = ENV.APP;

export default class FileUploaderService extends Service {
  @service currentUser;
  @service session;

  @tracked token;

  constructor() {
    super(...arguments);

    if (this.session.isAuthenticated) {
      this.token = this.session.data.authenticated.access_token;
    }
  }

  @action
  upload(file) {
    return file.upload(host + '/upload', {
      headers: { Authorization: 'Bearer ' + this.token }
    });
  }
}
