import Route from '@ember/routing/route';

export default class WorkoutRoute extends Route {
  name = "foo";

  afterModel(model, transition) {
    // this._super(controller, model);
    // console.log(this.routeName);
  }

}
