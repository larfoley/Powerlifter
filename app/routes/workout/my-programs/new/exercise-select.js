import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class WorkoutMyProgramsNewWeekRoute extends Route {
  model({ workoutSessionId }) {

    const workoutSessions = this.store.peekAll('workout-session');
    const workoutSession = workoutSessions.findBy('guid', workoutSessionId)

    if (workoutSession) {
      return hash({
        workoutSession,
        exercises: this.store.findAll('exercise')
      })
    }

    this.transitionTo('workout.my-programs.new');
  }
}
