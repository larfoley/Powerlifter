import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExercisesExerciseGoalsEditRoute extends Route {
  model() {
    const exercises = this.store.findAll('exercise');
    const exercise = this.modelFor('exercises.exercise');

    return hash({
      exercises,
      exercise
    })
  }
}
