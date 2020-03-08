import Route from '../protected';
import { hash } from 'rsvp';

export default class GoalsNewRoute extends Route {
  model() {
    return hash({
      exercises: this.store.findAll('exercise')
    })
  }
}
