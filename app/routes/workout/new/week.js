import Route from '@ember/routing/route';

export default class WorkoutMyProgramsNewWeekRoute extends Route {
  model({ week }) {
    console.log('week...');
    return {
      week
    }
  }
}
