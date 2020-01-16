import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';

const { host } = ENV.APP;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${host}/token`,
  rejectWithResponse: true,
  sendClientIdAsQueryParam: true
});
