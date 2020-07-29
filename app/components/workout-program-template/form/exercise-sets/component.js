import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class WorkoutProgramTemplateFormExerciseSetsComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    if (this.args.workoutBlock.sets.length === 0) {
      this.args.workoutBlock.sets.pushObject(this.store.createRecord('workout-set', {}));
    }
  }

  @action addSet() {
    const exerciseSet = this.store.createRecord('workout-set', {
      targetReps: this.args.workoutBlock.sets.lastObject.targetReps,
    })

    this.args.workoutBlock.sets.pushObject(exerciseSet);
  }
}
