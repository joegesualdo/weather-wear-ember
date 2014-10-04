import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['sessions'],

  currentUser: (function() {
      return this.get('controllers.sessions.currentUser');
    }).property('controllers.sessions.currentUser'),

  actions: {
    submitZip: function(){
      var _this = this;
      Ember.$.getJSON('api/v1/weather/'+this.get('zipcode')).then(fullfillmentCallback, failureCallback);

      function fullfillmentCallback(response){
        Ember.run(function(){
          _this.set('currentTemp', response['data']['current_temperature']);
        });
      }

      function failureCallback(error){
        Ember.run(function(){
          console.log(error);
        });
      }
    }
  }
});
