import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class GoalsNewRoute extends Route {
  model() {
    return hash({
      newGoal: this.store.createRecord('goal'),
      exercises: this.store.findAll('exercise')
    })
  }
}
