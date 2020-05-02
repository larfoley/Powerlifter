import Route from '@ember/routing/route';

export default class ExercisesNewRoute extends Route {
  model() {
    return [{name: "barbell"}, {name: "bodyweight"}]
  }
};
