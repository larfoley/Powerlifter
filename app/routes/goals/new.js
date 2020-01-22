import Route from '../protected';
import { hash } from 'rsvp';

export default class GoalsNewRoute extends Route {
  model() {
    return hash({
      newGoal: this.store.createRecord('goal'),
      exercises: this.store.findAll('exercise')
    })
  }
}
