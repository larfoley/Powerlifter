import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { filterBy } from '@ember/object/computed';
import { sort } from '@ember/object/computed';

export default class GoalListComponent extends Component {
  goalsSortingDesc = ['dueDate'];

  @filterBy('goals', 'isCompleted', true) completedGoals;
  @filterBy('goals', 'isCompleted', false) uncompletedGoals;

  get goals() {
    return this.args.goals || A();
  }

  get sortedGoals() {
    return A([...this.uncompletedGoals, ...this.completedGoals]);
  }
}
