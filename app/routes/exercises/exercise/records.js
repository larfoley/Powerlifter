import Route from '@ember/routing/route';

export default class ExercisesExerciseRecordsRoute extends Route {
  refreshModel = true;

  model() {
    const exercise = this.modelFor('exercises.exercise');

    return this.store.query('lift-record', { exercise: exercise.name })
  }
}
