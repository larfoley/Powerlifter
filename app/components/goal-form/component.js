import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class GoalFormComponent extends Component {
  @service router;
  @service toast;
  @service session;

  selectedExercise = "";
  selectedDueDate = "";

  async submit(e) {
    e.preventDefault();

    const goal = this.goal;

    goal.dueDate = this.selectedDueDate;
    goal.exercise = this.selectedExercise.name;

    try {
      await goal.save();

      this.toast.success('Goal added')
      this.router.transitionTo('goals')

    } catch(e) {
      this.toast.error(e.message)
    }
  }
};
