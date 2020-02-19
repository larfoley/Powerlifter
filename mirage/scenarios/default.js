export default function(server) {
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
  server.createList('post', 3);
  server.createList('notification', 3, {
    isUnread: false,
    text: 'Liked your post'
  });
  server.createList('notification', 3, {
    isUnread: true,
    text: 'Sent you a friend request'
  });
}
