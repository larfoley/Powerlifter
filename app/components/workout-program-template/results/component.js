import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class WorkoutProgramResultsComponent extends Component {
  @service store;

  @tracked achievments;

  constructor() {
    super(...arguments);
    this.getResults(this.args.workouts);

    this.achievments = A();
  }

  @action
  async getResults(workouts) {
    const promises = [];

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        exercise.sets.forEach((s) => {

          const liftRecord = this.store.createRecord('lift-record', {
            exercise: { name: exercise.exercise },
            reps: s.repsCompleted,
            weightLifted: s.weightLifted,
            date: new Date()
          })
          promises.push(liftRecord.save())
        });
      });
    });

    const results = await Promise.all(promises);

    results.forEach((result) => {
      this.achievments.pushObject(result);
      // if (result.isPersonalBest) {
      // }
    });

  }
}
