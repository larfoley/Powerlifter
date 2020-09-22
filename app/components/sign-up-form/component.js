import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SignUpComponent extends Component {
  @service router;
  @service toast;
  @service session;
  @service store;

  @tracked user;

  constructor() {
    super(...arguments);
    this.user = this.store.createRecord('user');
  }

  willDestroy() {
    this.user.deleteRecord();
  }

  async submit(e) {
    e.preventDefault();
    const user = this.user;
    const toast = this.toast;

    if (user.validate()) {
      try {
        const password = user.password;
        await user.save();
        await this.session.authenticate('authenticator:oauth2-password-grant', user.username, password);

        toast.success('Account Created');
        toast.success('You are signed in');

        this.router.transitionTo('/home');

      } catch (error) {
        if (user.isValid) {
          error.errors.forEach((err) => {
            toast.error(err.detail);
          })
        } else {
          toast.info('fix validation errors');
        }
      }

    } else {
      toast.info('fix validation errors');
    }
  }
}
