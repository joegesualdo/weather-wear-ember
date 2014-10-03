import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

import MockServer from '../helpers/server-helper';

var App;
var server;

module('Integration - Sign in', {
  setup: function() {
    App = startApp();
    server = MockServer.start();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
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
