import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GoalCardComponent extends Component {
  @service toast;

  @tracked showConfirmModal = false;
  @tracked dueDate = this.args.goal.dueDate;

  get daysLeft() {
    const dueDate = this.dueDate;

    if (dueDate) {
      const todaysDate = new Date();
      const timeDifference = dueDate.getTime() - todaysDate.getTime();

      return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }

    return dueDate;
  }

  get dueDateIsClose() {
    return this.daysLeft <= 10;
  }

  @action
  toggleModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }

  @action
  async toggleStatus() {
    const goal = this.args.goal;

    goal.completed = !goal.completed;

    await goal.save();

    this.showConfirmModal = false;
  }

  @action
  async deleteGoal() {
    const goal = this.args.goal;

    goal.deleteRecord();
    this.showConfirmModal = false;

    try {
      await goal.save();

      this.toast.success('Goal Deleted');

    } catch(e) {
      this.toast.error(e.message)
    }
  }
}
