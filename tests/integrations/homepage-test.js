import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

var App;
var server;
var users;

module('Integration - homepage', {
  setup: function() {
    App = startApp();

    // Mock server requests:  ------------------------------------------------
    users= [
      {
        id: 1,
        email: 'kjfdlaskj@gmail.com'
      },
      {
        id: 2,
        name: 'kjfdlajks@gmail.com'
      },
      {
        id: 3,
        name: 'fdkjfalkjd@gmail.com'
      }
    ];
    server = new Pretender(function() {
      this.get('/api/v1/users', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users:users})];
      });
    });
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
