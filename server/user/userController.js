var Promise = require('bluebird');
var User = require('./userModel');

module.exports = {
  login: function(username, password) {
    return new Promise(function(resolve, reject){
      new User({ username: username }).fetch().then(function(user){
        if (!user) {
          reject({ error: 'No such user.', status: 401 });
        } else {
          user.comparePassword(password, function(match){
            if (match) {
              console.log('User match: ', user);
              resolve(user);
            } else {
              reject({ error: 'Incorrect password.', status: 401 })
            }
          });
        }
      });
    })
  },

  signup: function(username, password) {
    console.log(username, password);
    return new Promise(function(resolve, reject){
      new User({ username: username }).fetch().then(function(user) {
        if ( !user ) {
          new User({username: username, password: password}).save()
          .then(function(user) {
            console.log('New user: ', user);
            resolve(user);
          })
          .catch(function(error){
            reject({'error saving new user to database ': error})
          })
        } else {
          reject({error: 'Account already exists.', status: 409});
        }
      });
    });
  }
};
