import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ExercisesExerciseRecordsNewRoute extends Route {
  model() {
    const exercises = this.store.findAll('exercise');
    const exercise = this.modelFor('exercises.exercise');
    const records = this.modelFor('exercises.exercise.records');

    return hash({
      exercises,
      exercise,
      records
    })
  }
}
