import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

import MockServer from '../helpers/server-helper';

var App;
var server;

module('Integration - see a list of users on homepage', {
    
  // Setup:  ------------------------------------------------
  setup: function() {
    App = startApp();
    server = MockServer.start();
  },

  // Teardown:  ------------------------------------------------
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("see correct number of users", function(){
  visit("/");
  andThen(function(){
    equal(find('li.user').length, 5, 'Welcome to Weather Wear');
  });
});
