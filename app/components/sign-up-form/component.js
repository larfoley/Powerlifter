import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  router: service('router'),
  toast: service(),
  session: service(),

  submit(e) {
    e.preventDefault();
    const user = get(this, 'user');
    const toast = get(this, 'toast');
    const router = get(this, 'router');

    if (user.validate()) {
      user.save()
        .then(() => {
          toast.success('Account created');
          router.transitionTo('sign-in')
        })
        .catch((error) => {
          if (user.get('isValid')) {
            error.errors.forEach((err) => {
              toast.error(err.detail);
            })
          } else {
            toast.info('fix validation errors');
          }
        })
    } else {
      toast.info('fix validation errors');
    }
  }
});
