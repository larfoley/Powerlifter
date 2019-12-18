import Model, { attr } from '@ember-data/model';
import { computed, get } from '@ember/object';
import { capitalize } from '@ember/string';

export default Model.extend({
  name: attr('string'),

  displayName: computed('name', function() {
    return capitalize(get(this, 'name'));
  }),
});
