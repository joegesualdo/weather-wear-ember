import startApp from 'weather-wear/tests/helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';

var App;
var server;
var users;

module('Integration - see a list of users on homepage', {
    
  // Setup:  ------------------------------------------------
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

  // Teardown:  ------------------------------------------------
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("see correct number of users", function(){
  visit("/");
  andThen(function(){
    equal(find('li.user').length, 3, 'Welcome to Weather Wear');
  });
});
