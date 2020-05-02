import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class SignUpComponent extends Component {
  @service router;
  @service toast;
  @service session;

  async submit(e) {
    e.preventDefault();
    const user = this.user;
    const toast = this.toast;

    if (user.validate()) {
      try {
        await user.save();
        toast.success('Account created');
        this.router.transitionTo('sign-in')

      } catch (error) {
        console.log("is valid", user.errors);
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
      console.log(1, user.get('errors.email'));
    }
  }
}
