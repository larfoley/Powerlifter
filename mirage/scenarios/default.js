export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
  server.create('exercise', {
    name: 'Squat'
  });
  server.create('exercise', {
    name: 'Bench'
  });
  server.create('exercise', {
    name: 'Deadlift'
  });
  server.create('user', {
    username: 'bob'
  });
  server.create('user', {
    username: 'bobby'
  });
  server.create('user', {
    username: 'bo'
  });
  server.create('goal', {
    exercise: { name: 'Deadlift' },
    weight: 100,
    reps: 1,
    dueDate: new Date()
  });
  server.create('lift-record', {
    exercise: { name: 'Squat' },
    weightLifted: 100,
    reps: 1,
    date: new Date()
  });
  server.create('lift-record', {
    exercise: { name: 'Deadlift' },
    weightLifted: 250,
    reps: 1,
    date: new Date()
  });
}
