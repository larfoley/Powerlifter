import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('user');
  this.route('protected');
  this.route('sign-up');
  this.route('home');
  this.route('sign-in');

  this.route('posts', function() {
    this.route('new');
    this.route('post', { path: '/:post_id' });
  });
  this.route('exercises', function() {
    this.route('exercise', { path: '/:exercise_id' }, function() {
      this.route('goals', function() {
        this.route('new');
        this.route('edit', { path: '/:goal_id/edit' });
      });
      this.route('charts', function() {
      });
      this.route('records', function() {
        this.route('new');
        this.route('record', { path: '/:lift_record_id' }, function() {
          this.route('share');
        });
        this.route('edit', { path: '/:lift_record_id/edit' });
        this.route('delete');
        this.route('share');
      });
    });
    this.route('new');
    this.route('records');
  });
  this.route('my-network', function() {
    this.route('search');
    this.route('feed', function() {
      this.route('post', { path: '/:post_id' });
    });
    this.route('friend-requests');
    this.route('friends', function() {
      this.route('find');
    });
  });
  this.route('goals',  function() {
    this.route('new');
    this.route('goal', { path: '/:goal_id' });
    this.route('edit', { path: '/:goal_id/edit' });
    this.route('delete', { path: '/:goal_id/delete' });
  });
  this.route('records', function() {
    this.route('new');
    this.route('record', { path: '/:lift_record_id' });
    this.route('edit', { path: '/:lift_record_id/edit' });
  });
  this.route('notifications');
  this.route('more');
  this.route('friends', function() {});

  this.route('users', function() {});
  this.route('file-upload');
  this.route('profile', function() {
    this.route('posts');
    this.route('friends');
    this.route('programs');
    this.route('update-cover-photo');
  });
  this.route('current-program');

  this.route('workout', function() {
    this.route('diary', function() {});
    this.route('new', function() {
      this.route('exercise-select');
      this.route('edit-exercise');
    });
    this.route('my-programs', function() {
      this.route('my-program', { path: '/:workout_program_id' });

      this.route('new', function() {
        this.route('week', { path: '/:week' });
        this.route('exercise-select');
        this.route('edit-exercise');
      });
    });
    this.route('history');
  });

  this.route('sign-out');
});
