import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SignOutRoute extends Route {
  @service session;

  beforeModel() {
    this.session.invalidate()
    this.redirectTo('sign-in');
  }
}
