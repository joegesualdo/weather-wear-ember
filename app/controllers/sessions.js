import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    if (Ember.$.cookie('access_token')) {
      Ember.$.ajaxSetup({
        headers: {
          'X-AUTH-TOKEN': Ember.$.cookie('access_token')
        }
      });
    }
  },
  attemptedTransition: null,
  token: Ember.$.cookie('access_token'),
  currentUser: Ember.$.cookie('auth_user'),
  tokenChanged: (function() {
    if (Ember.isEmpty(this.get('token'))) {
      Ember.$.removeCookie('access_token');
      Ember.$.removeCookie('auth_user');
    } else {
      Ember.$.cookie('access_token', this.get('token'));
      Ember.$.cookie('auth_user', this.get('currentUser'));
    }
  }).observes('token'),
  
  // reset the current user
  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      token: null,
      currentUser: null
    });
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Bearer none'
      }
    });
  },

  // Actions:  ------------------------------------------------
  actions: {
    loginUser: function() {
      var _this = this;

      var data = this.getProperties('email', 'password');
      var attemptedTrans = this.get('attemptedTransition');

      // Reset the form fields after submitting form
      this.setProperties({
        email: null,
        password: null
      });

      // POST to sign in user
      Ember.$.post('/api/v1/sign_in', data).then(fullfillmentCallback, rejectionCallback);
      // ajax fullfillment callback 
      function fullfillmentCallback(response) {
        // IMPORTANT: You MUST wrap all success and error callback for ajax request in EMber.run
        Ember.run(function(){
          // If ajax POST is successful---------------------
            // Set the X-AUTH-TOKEN header with the current users auth token
            Ember.$.ajaxSetup({
              headers: {
                'X-AUTH-TOKEN': response.auth_token
              }
            });
            // END: Set the X-AUTH-TOKEN header with the current users auth token
            // Get the user object for the user that just signed in ---------
            _this.store.find('user', response.user_id).then(function(user) {
              _this.setProperties({
                token: response.auth_token,
                currentUser: user.get('email'),
              });
              // If user was attempting to visit a page that required authentication
              // then we route them back there
              if (attemptedTrans) {
                attemptedTrans.retry();
                _this.set('attemptedTransition', null);
              } else {
                _this.transitionToRoute('index');
              }
            });
            // END: Get the user object for the user that just signed in ---------
        });
      }

      // ajax rejection callback 
      function rejectionCallback(error) {
        // IMPORTANT: You MUST wrap all success and error callback for ajax request in EMber.run
        // OR your test will give you errors
        Ember.run(function(){
            // If ajax POST fails 
          if (error.status === 401) {
            console.log("wrong user or password, please try again");
          } else {
            console.log("something went wrong with logging in");
          }
        });
      }

    }
  }
});

