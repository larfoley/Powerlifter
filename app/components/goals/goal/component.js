import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GoalCardComponent extends Component {
  @service toast;

  @tracked showConfirmModal = false;
  @tracked showingConfirmMarkGoalCompleteDialog = false;
  @tracked dueDate = this.args.goal.dueDate;
  @tracked shouldShareGoal = true;
  @tracked shouldPostLiftRecord = true;

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
  toggleConfirmMarkGoalCompleteDialog() {
    this.showingConfirmMarkGoalCompleteDialog = !this.showingConfirmMarkGoalCompleteDialog;
  }

  @action
  async markComplete() {
    const goal = this.args.goal;

    goal.isCompleted = true;
    goal.completedOn = new Date();

    await goal.save();

    this.showingConfirmMarkGoalCompleteDialog = false;
    this.toast.success('Goal Completed');

    this.shouldShareGoal = false;
    this.shouldPostLiftRecord = false;
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

  @action
  toggleShouldShareGoal() {
    this.shouldShareGoal = !this.shouldShareGoal;
  }

  @action
  toggleShouldPostLiftRecord() {
    this.shouldPostLiftRecord = !this.shouldPostLiftRecord;
  }
}
