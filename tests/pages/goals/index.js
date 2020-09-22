import {
  create,
  visitable,
  collection,
  clickable
} from 'ember-cli-page-object';
// import goalList from '../components/goal-list';

export default create({
  visit: visitable('/goals'),
  goals: collection('[data-test-goals-item]', {
    clickCompleteGoalCheckbox: clickable('[data-test-goal-checkbox]')
  }),
  confirmCompleteGoal: clickable('[data-test-confirm-yes]')
});
