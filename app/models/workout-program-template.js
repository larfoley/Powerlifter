import { attr, hasMany, belongsTo } from '@ember-data/model';
import WorkoutProgramBaseModel from './workout-program-base';
import Copyable from 'ember-data-copyable';
import { A } from '@ember/array';

export default class WorkoutProgramTemplateModel extends WorkoutProgramBaseModel.extend(Copyable) {
  
}
