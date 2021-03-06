var db = require('../db');
var bcrypt = require('bcrypt');
var Promise  = require('bluebird');
var Application = require('../application/applicationModel');

var User = db.Model.extend({
  tableName: 'applicant',

  hasTimestamps: ["createdAt", "updatedAt"],

  applications: function() {
    return this.hasMany(Application);
  },

  initialize: function() {
    this.on('creating', this.hashPassword, this);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  hashPassword: function(model, attrs, options) {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(model.attributes.password, 10, function(err, hash) {
        if( err ) reject(err);
        model.set('password', hash);
        resolve(hash);
      });
    });
  },

});

module.exports = User;
