import Route from './protected';

export default class GoalsRoute extends Route {
  redirect() {
    this.transitionTo('goals.due')
  }
}
