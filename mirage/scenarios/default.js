export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.create('goal', {
  //   exercise: 'Squat',
  //   weight: 190,
  //   reps: 1,
  //   done: false,
  // });
  // server.create('goal', {
  //   exercise: 'Deadlift',
  //   weight: 190,
  //   reps: 1,
  //   done: false,
  // });
  server.create('exercise', {
    name: 'squat'
  });
  server.create('exercise', {
    name: 'bench'
  });
  server.create('exercise', {
    name: 'deadlift'
  });
}
