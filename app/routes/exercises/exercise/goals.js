import Route from '@ember/routing/route';

export default class ExercisesExerciseGoalsRoute extends Route {
  model() {
    const exercise = this.modelFor('exercises.exercise').name;

    return this.store.query('goal', { exercise })
  }
}
