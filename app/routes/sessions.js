import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, context) {
    controller.reset();
  },
  beforeModel: function(transition) {
    if (!Ember.isEmpty(this.controllerFor('sessions').get('token'))) {
      this.transitionTo('secret');
    }
  }
});
