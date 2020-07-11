import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class WorkoutProgramTemplateFormExerciseSetsComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    this.newExerciseSet = this.store.createRecord('workout-program-set', {

    })
  }

  @action addSet() {
    const exerciseSet = this.store.createRecord('workout-program-set', {
      order: this.newExerciseSet.order,
      targetReps: this.newExerciseSet.targetReps,
    })

    this.args.exerciseSets.pushObject(exerciseSet);
    console.log('add set');
    this.newExerciseSet.order = parseInt(this.args.exerciseSets.sortBy('order').lastObject.order) + 1.
  }
}
