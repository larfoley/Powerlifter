import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class WorkoutMyProgramsNewEditExerciseController extends Controller {
  queryParams = ['workoutBlockId'];

  workoutBlockId = null;

  @action
  editExercise(workoutBlock, exercise) {
    workoutBlock.exercise = exercise.name;

    this.transitionToRoute('workout.new');
  }
}
