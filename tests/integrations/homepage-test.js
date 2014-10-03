import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

import MockServer from '../helpers/server-helper';

var App;
var server;

module('Integration - homepage', {
  setup: function() {
    App = startApp();
    server = MockServer.start();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test("the title 'Welcome to Weather Wear' is shown", function(){
  visit("/");
  andThen(function(){
    equal(find('.title').text(), "Welcome to Weather Wear");
  });
});
