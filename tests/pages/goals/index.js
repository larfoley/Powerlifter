import {
  create,
  visitable
} from 'ember-cli-page-object';
import goalList from '../components/goal-list';

export default create({
  visit: visitable('/goals/new'),
  goalList
});
