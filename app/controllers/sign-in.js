import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class SignInController extends Controller {
  @service session;
  @service toast;

  @action
  async authenticate(identification, password) {
    const toast = this.toast;

    try {
      await this.session.authenticate('authenticator:oauth2-password-grant', identification, password);
    } catch(error) {
      if (error.status === 401) {
        toast.error('Invalid email or password')
      } else {
        toast.error('Unable to sign in. try again later')
      }
    }

    if (this.session.isAuthenticated) {
      toast.success("Signed in");
      this.transitionToRoute('/home');
    }
  }
}
