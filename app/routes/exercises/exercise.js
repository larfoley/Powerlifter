import Route from '@ember/routing/route';

export default class ExercisesExerciseRoute extends Route {
  // beforeModel(transition, p) {
  //   this.transitionTo('exercises.exercise.records', this.currentModel)
  // }
  model({ exercise_id }) {
    console.log("id", exercise_id);
    return this.store.findRecord('exercise', exercise_id);
  }
};
