import Component from '@ember/component';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'form',
  router: service('router'),
  toast: service('toast'),

  init() {
    this._super(...arguments);
    this.set('errors', A())
  },

  submit(e) {
    e.preventDefault();
    const user = this.get('user');
    const toast = this.get('toast');
    const router = this.get('router');

    if (!user.validate()) {
      toast.error('Fix Validation errors', 'Error');
      return;
    }

    user.save()
      .then(() => {
        toast.success('Account registered', 'Success');
        router.transitionTo('home');
      })
      .catch((error) => {
        if (!user.get('isValid')) {
          toast.error('Please fix validation errors');

        } else if (error.errors) {
          error.errors.forEach((err) => {
            toast.error(err.detail);
          })

        } else {
          toast.error('Unable to sign up');
        }
      })
  }
});
