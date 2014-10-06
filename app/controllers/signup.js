import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  actions: {
    createUser: function(){
      var user = this.store.createRecord('user', {
        email: this.get('email'),
        password: this.get('password')
      });

      // Saves the user and handles the success and error responses
      var self = this;
      user.save().then(function() {
          // sign in the user
          self.get('controllers.application').send('loginUser', self.get('email'), self.get('password'));
          // transition to home
          self.transitionToRoute('index');
        }, function(resp) {
          if (resp.responseJSON) {
            // self.get('model').set('errors', resp.responseJSON.errors);
            console.log('errror', resp.responseJSON.message);
          } 
      });
    }
  }
});
