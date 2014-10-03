import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

var App;
var server;
var user;
var users;
var postResponse;

module('Integration - Sign in', {
  setup: function() {
    App = startApp();
    // Mock server requests:  ------------------------------------------------
    postResponse = {
        user_id: 23,
        auth_token: "4mmPQsDf7cX_Z16-UuzB"
    };
    users = [
      {
        id: 1,
        email: 'kjfdlaskj@gmail.com'
      },
      {
        id: 2,
        email: 'kjfdlajks@gmail.com'
      },
      {
        id: 23,
        email: 'penny@test.com'
      }
    ];
    user = {
      id: 23,
      email: "penny@test.com",
      authentication_token: "4mmPQsDf7cX_Z16-UuzB"
    };
    server = new Pretender(function() {
      this.get('/api/v1/users', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users:users})];
      });
      this.post('/api/v1/sign_in', function(request) {
        return [201, {"Content-Type": "application/json"}, JSON.stringify(postResponse)];
      });
      this.get('/api/v1/users/23', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
      });
    });
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
