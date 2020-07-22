import Route from '@ember/routing/route';

export default class ExercisesExerciseIndexRoute extends Route {
  beforeModel() {
    const model = this.modelFor('exercises.exercise');

    this.transitionTo('exercises.exercise.records', model)
  }
}
