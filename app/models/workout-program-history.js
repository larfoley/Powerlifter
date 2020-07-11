import Model, { attr, belongsTo } from '@ember-data/model';

export default class WorkoutProgramHistoryModel extends Model {
  @belongsTo('workout-program', { async: false }) workoutProgram;
  @belongsTo('user') user;
  @attr('boolean') isActive;
}
