import Ember from 'ember';

export default Ember.Mixin.create({
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
  isAuthenticated: (function() {
      return !Ember.isEmpty(this.get('currentUser'));
    }).property('currentUser')
});
