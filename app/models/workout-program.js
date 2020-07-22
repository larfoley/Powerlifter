import { attr } from '@ember-data/model';
import WorkoutProgramBaseModel from './workout-program-base';
import Copyable from 'ember-data-copyable';

export default class WorkoutProgramModel extends WorkoutProgramBaseModel.extend(Copyable) {
  @attr('date') startedOn;
  @attr('date') completedOn;
  @attr('boolean', { defaultValue: false }) isActive;

  get progress() {
    let totalSets = 0;
    let totalCompletedSets = 0;

    this.weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercise.sets.forEach((s) => {
            totalSets++;
            if (s.completed) {
              totalCompletedSets++
            }
          });
        })
      });
    });

    return Math.floor(( totalCompletedSets / totalSets ) * 100)
  }
}
