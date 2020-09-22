import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class GoalsGoalComponent extends Component {
  @service store;
  @service toast;
  @service currentUser;

  @tracked showConfirmModal = false;
  @tracked showingConfirmMarkGoalCompleteDialog = false;
  @tracked shouldShareGoal = false;
  @tracked shouldPostLiftRecord = false;

  get goal() {
    return this.args.goal;
  }

  get dueDate() {
    return this.goal.dueDate || null
  }

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

    try {
      await goal.save();

      this.toast.success('Goal Completed');

      if (this.shouldShareGoal) {
        await this._postGoal(goal);
      }

      if (this.shouldPostLiftRecord) {
        await this._postLiftRecord();
      }

    } catch (e) {
      goal.rollbackAttributes();

      this.toast.error(e.message)

    } finally {
      this.showingConfirmMarkGoalCompleteDialog = false;
      this.shouldShareGoal = false;
      this.shouldPostLiftRecord = false;
    }
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

  async _postGoal(goal) {
    const post = this.store.createRecord('post', {
      author: this.currentUser.user,
      actionText: 'Completed a goal 🎉',
      content: `${goal.exercise.name} ${goal.weight}kgs for ${goal.reps} reps`
    })

    try {
      await post.save();

      this.toast.success('Posted Goal');

    } catch (e) {
      post.rollbackAttributes();
    }
  }

  async _postGoal(goal) {
    const { exercise, weight, reps } = this.goal;

    const liftRecord = this.store.createRecord('lift-record', {
      exercise,
      reps,
      weightLifted: weight,
      date: new Date(),
    })

    try {
      await liftRecord.save();

      this.toast.success('Lift Record Created');

    } catch (e) {
      liftRecord.rollbackAttributes();

      this.toast.success('Lift Record Created');
    }}
}
