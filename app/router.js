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
});
