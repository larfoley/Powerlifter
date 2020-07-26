import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

export default class WorkoutProgramHistoryItemComponent extends Component {
  @tracked showResults = false;

  @action
  toggleResults() {
    this.showResults = !this.showResults;
  }
}
