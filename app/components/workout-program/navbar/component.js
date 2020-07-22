import Component from '@glimmer/component';

export default class WorkoutProgramNavbarComponent extends Component {
  get showFinishWorkoutButton() {
    return this.args.currentWorkoutSession.everyWorkoutBlockIsCompleted && !this.args.currentWorkoutSession.completed;
  }
}
