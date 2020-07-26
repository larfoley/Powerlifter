import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExerciseSelectComponent extends Component {
  @service store;

  @action
  searchExercises(searchTerm) {
    return this.store.query('exercise', { exercise: searchTerm });
  }
}
