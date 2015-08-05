var Promise = require('bluebird');
var User = require('./userModel');

module.exports = {

  signup: function(email, password) {
    console.log(email, password);
    return new Promise(function(resolve, reject){
      new User({ email: email }).fetch().then(function(user) {
        if ( !user ) {
          new User({email: email, password: password}).save()
          .then(function(user) {
            resolve(user);
          })
          .catch(function(error){
            reject({ 'error saving new user to database ': error })
          })
        } else {
          reject({ error: 'Account already exists.', status: 409 });
        }
      });
    });
  },

  login: function(email, password) {
    return new Promise(function(resolve, reject){
      new User({ email: email }).fetch().then(function(user){
        if (!user) {
          reject({ error: 'No such user.', status: 401 });
        } else {
          user.comparePassword(password, function(match){
            if (match) {
              resolve(user);
            } else {
              reject({ error: 'Incorrect password.', status: 401 })
            }
          });
        }
      });
    })
  },

  logout: function(req) {
    return new Promise(function(resolve, reject){
      req.session.destroy();
      if(!req.session){
        resolve();
      } else {
        reject({ error: 'Session still exists!', status: 500 });
      }
    });
  }

};
