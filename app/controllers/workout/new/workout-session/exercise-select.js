import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class WorkoutNewWorkoutSessionExerciseSelectController extends Controller {
  @action
  selectExercise(exercise) {
    const workoutBlock = this.store.createRecord('workout-block', {
      exercise: exercise.name
    })
    // const workoutProgramSet = this.store.createRecord('workout-program-set');
    //
    // workoutBlock.sets.pushObject(workoutProgramSet)

    this.model.workoutSession.exercises.pushObject(workoutBlock);

    this.transitionToRoute('workout.new');
  }
}
