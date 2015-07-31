var Promise = require('bluebird');
var userController = require('../user/userController');

module.exports = {
  login: function(req, res){
    userController.login(req.body.username, req.body.password)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'login error': error });
    })
  },

  signup: function(req, res){
    userController.signup(req.body.username, req.body.password)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'signup error': error });
    })
  }
}
