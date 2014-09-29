import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - homepage', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("the title 'Welcome to Weather Wear' is shown", function(){
  visit("/");
  andThen(function(){
    equal(find('.title').text(), "Welcome to Weather Wear");
  });
});
