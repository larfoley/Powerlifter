import Model, { attr } from '@ember-data/model';

export default Model.extend({
  exercise: attr('string')
});
