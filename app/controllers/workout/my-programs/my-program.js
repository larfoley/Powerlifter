import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class WorkoutMyProgramsMyProgramController extends Controller {
  @service currentUser;

  @action
  async activateProgram(workoutProgram) {

    const serializedWorkoutProgram = workoutProgram.serialize({ includeId: false });

    serializedWorkoutProgram.weeks = workoutProgram.weeks.map(week => week.serialize({ includeId: false }));
    //
    // serializedWorkoutProgram.weeks.forEach(week => {
    //   // week.workouts = week.workouts.map(workout => workout.serialize({ includeId: false }));
    //   week.workouts.forEach(workout => {
    //     console.log(workout);
    //     delete workout._id;
    //   });
    //
    // });

    const workoutProgramCopy = await workoutProgram.copy({ deep: false });
    // copy = copy.serialize({ includeId: false })
    await workoutProgramCopy.save()

    const workoutProgramHistory = this.store.createRecord('workout-program-history', {
      user: this.currentUser.user,
      // serializedWorkoutProgram
      workoutProgram: workoutProgramCopy,
      isActive: true
    });

    // const w = this.store.createRecord('workout-program', {
    //   ...workoutProgram
    // })

    try {
      await workoutProgramHistory.save();

    } catch (e) {
      console.log(e);
    }
  }
}
