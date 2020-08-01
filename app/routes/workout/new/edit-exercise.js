import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class WorkoutMyProgramsNewEditExerciseRoute extends Route {
  model({ workoutBlockId }) {
    const workoutBlocks = this.store.peekAll('workout-block');
    const workoutBlock = workoutBlocks.findBy('guid', workoutBlockId);

    if (workoutBlock) {
      return hash({
        workoutBlock,
        exercises: this.store.findAll('exercise')
      })
    }

    this.transitionTo('workout.new');
  }
}
