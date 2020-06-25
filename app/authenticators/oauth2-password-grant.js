import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

const { host } = ENV.APP;

export default class OAuth2PasswordGrantAuthenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = `${host}/token`;
  rejectWithResponse = true;
  sendClientIdAsQueryParam = true;
  @service currentUser;

  async invalidate(data) {
    await super.invalidate();

    await fetch(`${host}/sign-out`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.currentUser.user),
    });
  }
};
