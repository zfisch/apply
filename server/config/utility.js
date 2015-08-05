var Promise = require('bluebird')

// var appId, apiKey;
// try {
//   appId = process.env.APPLICATION_ID || require('../config/config.js').APPLICATION_ID;
//   apiKey = process.env.APPLICATION_KEY || require('../config/config.js').APPLICATION_KEY;
// }
// catch (e) {
//   appId = 12345;
//   apiKey = 98765;
// }


exports.isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)){
    res.status(401).send();
  } else {
    next();
  }
};

exports.sendLoggedInStatus = function(req, res) {
  res.status(200).send(req.session.user);
};

exports.logout = function(req, res) {
  req.session.destroy(function(){
      res.status(200).send({});
    });
};