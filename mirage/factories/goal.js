import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  exercise: 'Squat',

  isCompleted: false,

  dueDate() {
    return new Date();
  }
});
