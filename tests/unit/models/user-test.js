import Ember from "ember";
import DS from "ember-data";
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('user', 'User', {
  setup: function(){
  },
  teardown: function(){
  }
});

// Attributes:  ------------------------------------------------
test('property: email', function(){
  expect(2);

  var User = this.store().modelFor('user');
  var property = User.metaForProperty('email');

  ok(property.isAttribute, 'email is not an attribute on User');
  equal(property.type, 'string', 'email property is not a string');
});

test('property - password', function(){
  expect(2);

  var User = this.store().modelFor('user');
  var property = User.metaForProperty('password');

  ok(property.isAttribute, 'password is not an attribute on User');
  equal(property.type, 'string', 'password property is not a string');
});

test('property: zipcode', function(){
  expect(2);

  var User = this.store().modelFor('user');
  var property = User.metaForProperty('zipcode');

  ok(property.isAttribute, 'zipcode is not an attribute on User');
  equal(property.type, 'string', 'zipcode property is not a string');
});

test('property: phone', function(){
  expect(2);

  var User = this.store().modelFor('user');
  var property = User.metaForProperty('phone');

  ok(property.isAttribute, 'phone is not an attribute on User');
  equal(property.type, 'string', 'phone property is not a string');
});
