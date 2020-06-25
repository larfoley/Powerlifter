import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class WorkoutSessionComponent extends Component {

  @action
  setIsValid(exerciseSet) {
    return exerciseSet.repsCompleted >= 0 && exerciseSet.weightLifted >= 0;
  }

  @action
  updateSet(exerciseSet) {
    set(exerciseSet, "completed", this.setIsValid(exerciseSet));

    const everySetIsCompleted = this.args.workout.exercises
      .every(({ sets }) => sets.every(exerciseSet => exerciseSet.completed));

    set(this.args.workout, "completed", everySetIsCompleted);
  }
}
