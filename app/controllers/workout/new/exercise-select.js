import Controller from '@ember/controller';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
export default class WorkoutMyProgramsNewExerciseSelectController extends Controller {
  queryParams = ['workoutSessionId'];

  workoutSessionId = null;

  @action
  selectExercise(exercise) {
    const workoutSession = this.model.workoutSession;

    const workoutBlock = this.store.createRecord('workout-block', {
      exercise: exercise.name
    })

    workoutBlock.sets.pushObject(this.store.createRecord('workout-set'))

    workoutBlock.guid = guidFor(workoutBlock);

    workoutSession.exercises.pushObject(workoutBlock);

    this.transitionToRoute('workout.new');
  }
}
