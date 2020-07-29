import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class GoalFormComponent extends Component {
  @service router;
  @service toast;
  @service session;
  @service store;
  @tracked goal;
  @tracked showingConfirmModal = false;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.goal) !== "instance") {
      this.goal = this.store.createRecord('goal');

      if (this.args.selectedExercise) {
        this.goal.exercise = this.args.selectedExercise
      }

    } else {
      this.goal = this.args.goal;
    }

    this.dateValues = []
  }

  willDestroy() {
    if (this.goal.isNew) {
      this.goal.deleteRecord()
    }

    if (this.goal.hasDirtyAttributes) {
      this.goal.rollbackAttributes()
    }

  }

  @action
  async checkIfGoalHasAlreadyBeenAchieved() {
    const exercise = this.goal.exercise.name;
    const reps = this.goal.reps;
    const weight = this.goal.weight;

    const liftRecords = await this.store.query('lift-record', {
      exercise,
      reps,
      limit: 1,
      weightLifted: { $gte: weight }
    });

    return liftRecords.length > 0;
  }

  @action
  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    if (await this.checkIfGoalHasAlreadyBeenAchieved()) {

      this.showConfirmModal();
      return;
    }

    this.createOrUpdateGoal();
  }

  @action
  validate() {
    if (!this.goal.validate()) {
      this.toast.info('Fix validation errors');
      return false;
    }

    return true;
  }

  @action
  async createOrUpdateGoal(hasPreviouslyAchievedGoal) {
    const goal = this.goal;
    const isCreatingGoal = goal.isNew;

    if (!this.validate()) {
      return;
    }

    try {
      await goal.save();

      if (isCreatingGoal) {
        this.toast.success('Goal added');
      } else {
        this.toast.success('Goal updated');
      }

      if (hasPreviouslyAchievedGoal) {
        goal.hasPreviouslyAchievedGoal = true;
      }

      if (typeOf(this.args.onCreateOrUpdate) === "function") {
        this.args.onCreateOrUpdate();
      }

    } catch(error) {
      console.error(error);
      
      error.errors.forEach(err => {
        this.toast.info(err.detail);
      });
    }
  }

  @action
  onDateChange(dateValues) {
    this.goal.dueDate = dateValues[0];
    this.dateValues = dateValues;
  }

  @action
  toggleConfirmModal() {
    this.showingConfirmModal = !this.showingConfirmModal;
  }

  @action
  showConfirmModal() {
    if (!this.validate()) {
      return;
    }

    this.showingConfirmModal = true;
  }

  @action
  hideConfirmModal() {
    this.showingConfirmModal = false;
  }

  @action
  createPreviouslyAchievedGoal() {
    this.hideConfirmModal();
    this.createOrUpdateGoal();
  }
}
