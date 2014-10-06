import Ember from 'ember';

export default Ember.Mixin.create({
  // setupController: function(controller) {
  //   // controller.reset();
  // },
  // beforeModel: function() {
  //   if (!Ember.isEmpty(this.controllerFor('application').get('token'))) {
  //     this.transitionTo('secret');
  //   }
  // },
  // Actions:  ------------------------------------------------
  actions: {
    // create a global logout action
    logout: function() {
      // get the sessions controller instance and reset it to then transition to the sessions route
      this.controllerFor('application').reset();
      this.transitionTo('index');
    },
    loginUser: function(email, password) {
      var _this = this;

      var data = {email: email, password: password};
      var attemptedTrans = this.controllerFor('application').get('attemptedTransition');

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
              _this.controllerFor('application').setProperties({
                token: response.auth_token,
                currentUser: user.get('email'),
              });
              // If user was attempting to visit a page that required authentication
              // then we route them back there
              if (attemptedTrans) {
                attemptedTrans.retry();
                _this.controllerFor('application').set('attemptedTransition', null);
              } else {
                _this.transitionTo('index');
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
            console.log("something went wrong with logging in", error);
          }
        });
      }

    }
  }
});
