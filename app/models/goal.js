import Model, { attr } from '@ember-data/model';

export default Model.extend({
  exercise: attr('string'),
  weight: attr('number'),
  reps: attr('number'),
  done: attr('boolean'),
  dueDate: attr('string')
});
