import Model, { attr } from '@ember-data/model';
import { computed, get } from '@ember/object';
import { capitalize } from '@ember/string';

const exerciseType = {
  'BARBELL': 'barbell'
}

Object.freeze(exerciseType);

exerciseType.BARBELLS

export default Model.extend({
  name: attr('string'),
  category: attr(),

  displayName: computed('name', function() {
    return capitalize(get(this, 'name'));
  }),
});
