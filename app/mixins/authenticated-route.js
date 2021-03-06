import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    if (Ember.isEmpty(this.controllerFor('application').get('token'))) {
      return this.redirectToLogin(transition);
    }
  },
  redirectToLogin: function(transition) {
    this.controllerFor('application').set('attemptedTransition', transition);
    return this.transitionTo('sessions');
  },
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        console.log('unknown problem');
      }
    }
  }
});
