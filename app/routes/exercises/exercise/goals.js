import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const exercise = this.modelFor('exercises.exercise').name;

    return this.store.query('goal', { exercise });
  }
});
