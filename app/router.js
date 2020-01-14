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
  });
  this.route('exercises', function() {
    this.route('exercise', { path: '/:exercise_id' }, function() {
      this.route('goals', function() {
        this.route('new');
      });
      this.route('records', function() {
        this.route('new');
        this.route('record');
        this.route('edit');
      });
    });
    this.route('all');
    this.route('new');
  });
  this.route('my-network', function() {
    this.route('search');
    this.route('feed');
  });
  this.route('goals', function() {
    this.route('new');
  });
});
