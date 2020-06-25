import Route from '../protected';
import { hash } from 'rsvp';

export default class GoalsEditRoute extends Route {
  model({ goal_id }) {
    console.log('get edit goal');
    return hash({
      goal: this.store.findRecord('goal', goal_id),
      exercises: this.store.findAll('exercise')
    })
  }
}
