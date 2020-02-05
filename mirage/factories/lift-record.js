import { Factory } from 'ember-cli-mirage';

const exercises = ['Squat', 'Deadlift', 'Bench'];

export default Factory.extend({
  exercise() {
    return { name: exercises[Math.floor(Math.random() * exercises.length) ]};
  }
});
