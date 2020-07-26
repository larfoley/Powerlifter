import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class GoalsComponent extends Component {
  @tracked goals = this.args.goals;

  get sortedGoals() {
    const goals = A();

    goals.pushObjects(this.goals.filterBy('isCompleted', false).sortBy('dueDate'))
    goals.pushObjects(this.goals.filterBy('isCompleted', true).sortBy('dueDate'))

    return this.goals;
  }

}
