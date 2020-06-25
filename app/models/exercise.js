import Model, { attr } from '@ember-data/model';
import { computed, get } from '@ember/object';
import { capitalize } from '@ember/string';

const exerciseType = {
  'BARBELL': 'barbell'
}

Object.freeze(exerciseType);

exerciseType.BARBELLS

export default class ExerciseModel extends Model {
  @attr('string') name;
  @attr() category;

  get displayName() {
    return capitalize(this.name);
  }

};
