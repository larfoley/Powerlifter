import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  toast: service(),
  router: service(),

  submit(e) {
    e.preventDefault()
    const toast = get(this, 'toast');
    const goal = get(this, 'goal');
    const router = get(this, 'router');

    goal.save()
      .then(() => {
        toast.success('Goal added')
        router.transitionTo('exercises.exercise.goals')
      })

  }
});
