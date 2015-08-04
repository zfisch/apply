var Promise = require('bluebird');
var db = require('../db');
var utils = require('../config/utility');
var Application = require('./applicationModel');
var Note = require('../note/noteModel');
var Company = require('../company/companyModel');
var Contact = require('../contact/contactModel');
var Status = require('../status/statusModel');
var Job = require('../job/jobModel');
var jobController = require('../job/jobController');
var noteController = require('../note/noteController');
var User = require('../user/userModel');

module.exports = {

  createApplication: function(requestBody){
    return new Promise(function(resolve, reject){
      new Application({ "statusId": parseInt(requestBody.statusId, 10) })
      .save()
      .catch(function(err) {
        reject({ error: err, status: 500 });
      })
      .then(function(newApplication) {
        console.log("Created application: ", newApplication);
        resolve(newApplication);
      });
    });
  },

  updateApplication: function(application){
    return new Promise(function(resolve, reject){
      application.save()
      .catch(function(err){
        reject( {"Error saving application updates": err, status: 500 });
      })
      .then(function(updatedApplication){
        resolve(updatedApplication);
      });
    });
  }

}
