import Route from '@ember/routing/route';

export default class WorkoutMyProgramsMyProgramRoute extends Route {
  model(params) {
    const id = params.workout_program_id;

    return this.store.findRecord('workout-program-template', id);
  }
}
