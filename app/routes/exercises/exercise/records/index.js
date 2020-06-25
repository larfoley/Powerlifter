import Route from '@ember/routing/route';

export default class ExercisesExerciseRecordsIndexRoute extends Route {
  model(p) {
    const exercise = this.modelFor('exercises.exercise');
    // TODO: refactor
    return this.store.query('lift-record', { exercise: exercise.name })
  }
}
