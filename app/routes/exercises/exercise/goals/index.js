import Route from '@ember/routing/route';

export default class ExercisesExerciseGoalsIndexRoute extends Route {
  model() {
    const exercise = this.modelFor('exercises.exercise').name;

    return this.store.query('goal', { exercise });
  }
}
