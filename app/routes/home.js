import Route from './protected';
import { hash } from 'rsvp';

export default class HomeRoute extends Route {
  model() {
    return {
      posts: this.store.findAll('post'),
      friends: this.store.findAll('friend')
    }
  }
}
