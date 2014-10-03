import Pretender from 'pretender';

var server;

server = function(){
    var postResponse = {
      user_id: 23,
      auth_token: "4mmPQsDf7cX_Z16-UuzB"
    };
    var users = [
      {
       id: 1,
        email: 'kjfdlaskj@gmail.com'
      },
      {
        id: 2,
        email: 'kjfdlajks@gmail.com'
      },
      {
        id: 3,
        email: 'boom@test.com'
      },
      {
        id: 4,
        email: 'yoo@test.com'
      },
      {
        id: 23,
        email: 'penny@test.com'
      }
    ];
    var user = {
      id: 23,
      email: "penny@test.com",
      authentication_token: "4mmPQsDf7cX_Z16-UuzB"
    };

    var server = new Pretender(function() {
      this.get('/api/v1/users', function(request) {
        var response = [200, {"Content-Type": "application/json"}, JSON.stringify({users:users})];
        return response;
      });
      this.post('/api/v1/sign_in', function(request) {
        var response = [201, {"Content-Type": "application/json"}, JSON.stringify(postResponse)];
        return response;
      });
      this.get('/api/v1/users/23', function(request) {
        var response = [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
        return response;
      });
    });

    return server;
};

export default {
  start: server
};
