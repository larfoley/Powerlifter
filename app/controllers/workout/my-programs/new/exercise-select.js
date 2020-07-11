import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class WorkoutMyProgramsNewExerciseSelectController extends Controller {
  queryParams = ['workoutSessionId'];

  workoutSessionId = null;

  @action
  selectExercise(exercise) {
    const workoutSession = this.model.workoutSession;

    const workoutBlock = this.store.createRecord('workout-block', {
      exercise: exercise.name
    })

    workoutSession.exercises.pushObject(workoutBlock);

    this.transitionToRoute('workout.my-programs.new');
  }
}
