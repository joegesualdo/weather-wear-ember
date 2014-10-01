import AuthenticatedRoute from './authenticated';

// If we want to make a route only accessible to logged in users,
// then we extend class from AuthenticatedRoute
export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.find('user');
  }
});

