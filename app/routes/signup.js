import Ember from 'ember';

export default Ember.Route.extend({
  needs: ['application'],
  // If user is already signed in, then redirect them to the home page
  beforeModel: function(){
    if (this.controllerFor('application').get('isAuthenticated')){
      this.transitionTo('index');
    }
  }
});
