import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - Sign in', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    // Must remove the cookies to sign out user
    Ember.$.removeCookie('auth_user');
    Ember.$.removeCookie('access_token');
  }
});

test("user can sign in", function(){
  expect(1);
  visit("/sign_in");
  fillIn('#email', 'penny@test.com');
  fillIn('#password', 'password');
  click('#login');
  andThen(function(){
    equal(find('.users-email').text(), "penny@test.com");
  });
});
