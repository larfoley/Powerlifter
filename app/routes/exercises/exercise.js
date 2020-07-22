import Route from '@ember/routing/route';

export default class ExercisesExerciseRoute extends Route {
  model({ exercise_id }) {
    return this.store.findRecord('exercise', exercise_id);
  }
}
