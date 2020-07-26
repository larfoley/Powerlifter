import Component from '@glimmer/component';

export default class WorkoutProgramHistoryComponent extends Component {
  get sortedWorkoutHistory() {
    return this.args.workoutHistory.sortBy('completedOn').reverse();
  }
}
