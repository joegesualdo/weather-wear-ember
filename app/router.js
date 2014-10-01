import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('sessions', {path: '/sign_in'});
  this.resource('index', {path: '/'});
  this.route('signup', {path: 'sign_up'});
  this.route('secret');
});

export default Router;
