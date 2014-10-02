import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.reset();
  },
  beforeModel: function() {
    if (!Ember.isEmpty(this.controllerFor('sessions').get('token'))) {
      this.transitionTo('secret');
    }
  }
});
