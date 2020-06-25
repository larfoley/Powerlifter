import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GoalsDeleteController extends Controller {
  @service toast;

  @action
  async deleteGoal() {
    const goal = this.model;

    goal.deleteRecord();
    this.showConfirmModal = false;

    try {
      await goal.save();

      this.toast.success('Goal Deleted');
      this.transitionToRoute('goals');

    } catch(e) {
      console.log(e);
      this.toast.error(e.message)
    }
  }
}
