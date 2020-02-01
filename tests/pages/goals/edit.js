import {
  create,
  visitable
} from 'ember-cli-page-object';
import createOrEditGoalForm from '../components/create-or-edit-goal-form';
import goalList from '../components/goal-list';

export default create({
  visit: visitable('/goals/:goal_id/edit'),
  createOrEditGoalForm,
  goalList
});
