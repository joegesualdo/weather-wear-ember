import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - succesfully signup a user', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("creates a user", function(){
  visit("/sign_up");
  fillIn('input.email', "woowee@gmail.com");
  fillIn('input.password', "woowee@mail.com");
  click('button.create-user');
  andThen(function(){
    equal(find('.notification').text(), "woowee@gmail.com successfully created");
  });
});
