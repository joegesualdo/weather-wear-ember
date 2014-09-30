import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createUser: function(){
      var user = this.store.createRecord('user', {
        email: this.get('email'),
        password: this.get('password')
      });
      user.save();
      this.transitionToRoute('index');
    }
  }
});
