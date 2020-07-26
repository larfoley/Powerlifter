import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class WorkoutProgramTemplateFormExerciseSetsComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    console.log('constructro creating set');
    // this.newExerciseSet = this.store.createRecord('workout-set', {
    //
    // })
  }


  @action addSet() {
    console.log('add set from sets comp');
    const exerciseSet = this.store.createRecord('workout-set', {
      order: this.newExerciseSet.order,
      targetReps: this.newExerciseSet.targetReps,
    })

    this.args.exerciseSets.pushObject(exerciseSet);
    // this.newExerciseSet.order = parseInt(this.args.exerciseSets.sortBy('order').lastObject.order) + 1
  }
}
