import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),
  toast: service(),

  actions: {
    async authenticate(identification, password) {
      const toast = get(this, 'toast');

      try {
        await this.session.authenticate('authenticator:oauth2-password-grant', identification, password);
      } catch(error) {
        console.log(error);
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
});
