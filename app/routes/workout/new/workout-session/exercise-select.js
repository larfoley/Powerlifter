import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class WorkoutNewWorkoutSessionExerciseSelectRoute extends Route {
  model(params) {
    const id = params.workout_session_id;
    // const workoutSession = this.store.peekRecord('workout-session', id);
    const workoutSessions = this.store.peekAll('workout-session');
    const workoutSession = workoutSessions.findBy('guid', id);

    if (workoutSession === undefined || workoutSession === null) {
      this.transitionTo('workout.new');
    } else {
      return hash({
        workoutSession,
        exercises: this.store.findAll('exercise')
      });
    }
  }
}
