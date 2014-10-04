import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';

import MockServer from '../helpers/server-helper';

var App;
var server;

module('Integration - Getting weather', {
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

test("after user signs in and enters zipcode, they get the current weather for that zip", function(){
  expect(1);
  visit("/sign_in");
  fillIn('#email', 'penny@test.com');
  fillIn('#password', 'password');
  click('#login');
  fillIn('#zipcode', "07302");
  click('#submit-zip');
  andThen(function(){
    equal(find('#current-temperature').text(), 61.05);
  });
});
