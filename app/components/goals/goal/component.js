import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GoalCardComponent extends Component {
  @service toast;

  @tracked showConfirmModal = false;
  @tracked dueDate = this.args.goal.dueDate;

  get isOverdue() {
    const dueDate = this.dueDate;

    if (!dueDate) {
      return false;
    }

    const todaysDate = new Date();
    const timeDifference = dueDate.getTime() - todaysDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    return daysLeft < 0
  }

  get weeksLeft() {
    return Math.floor(this.daysLeft / 7);
  }

  get monthsLeft() {
    return Math.floor(this.weeksLeft / 4) + " " + this.weeksLeft % 4;
  }

  get dueDateIsClose() {
    return this.daysLeft <= 10;
  }

  @action
  toggleModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }

  @action
  async markComplete() {
    const goal = this.args.goal;

    goal.isCompleted = true;

    await goal.save();

    this.showConfirmModal = false;
    this.toast.success('Goal Completed');
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
