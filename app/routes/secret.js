import Ember from 'ember';
import AuthenticatedRouteMixin from 'weather-wear/mixins/authenticated-route';

// If we want to make a route only accessible to logged in users,
// then we extend class from AuthenticatedRoute
export default Ember.Route.extend(AuthenticatedRouteMixin);

