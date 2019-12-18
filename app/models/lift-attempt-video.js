import Model, { attr } from '@ember-data/model';

export default Model.extend({
  filename: attr('string'),
  filesize: attr('string'),
});
