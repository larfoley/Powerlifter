import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';

export default class GoalFormComponent extends Component {
  @service router;
  @service toast;
  @service session;
  @service store;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.goal) !== "instance") {
      this.goal = this.store.createRecord('goal');
    } else {
      this.goal = this.args.goal;
    }

    this.dateValues = []
  }

  willDestroy() {
    if (this.goal.isNew) {
      this.goal.deleteRecord()
    }
  }

  @action
  async createOrUpdateGoal(e) {
    e.preventDefault();

    const goal = this.goal;

    if (!goal.validate()) {
      this.toast.info('Fix validation errors');
      return;
    }

    if (this.selectedExercise) {
      goal.exercise = this.selectedExercise.name;
    }

    try {
      await goal.save();

      if (goal.isNew) {
        this.toast.success('Goal added');
      } else {
        this.toast.success('Goal updated');
      }

      this.router.transitionTo('goals')

    } catch(e) {
      this.toast.error(e.message)
    }
  }

  @action
  onDateChange(dateValues) {
    this.goal.dueDate = dateValues[0];
    this.dateValues = dateValues;
  }
}
