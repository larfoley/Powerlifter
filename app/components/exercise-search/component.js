import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ExerciseSearchComponent extends Component {
  @service router;
  @tracked searchTerm = "";

  get filteredExercises() {
    return this.args.exercises.filter((exercise) => {
      return exercise.name.includes(this.searchTerm)
    });
  }

  @action
  handleKeyPress(value) {
    this.searchTerm = value;
  }

  @action
  goToExercise(exercise) {
    this.router.transitionTo('exercises.exercise', exercise);
  }
}
