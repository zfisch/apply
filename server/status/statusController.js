var Promise = require('bluebird');
var db = require('../db');
var utils = require('../config/utility');
var Application = require('../application/applicationModel');
var Note = require('../note/noteModel');
var Company = require('../company/companyModel');
var Contact = require('../contact/contactModel');
var Status = require('../status/statusModel');
var Job = require('../job/jobModel');
var User = require('../user/userModel');
var StatusCollection = require('./statusCollection');

module.exports = {

  getStatusId: function(status) {
    return new Promise(function(resolve, reject){
      new Status({ "status": parseInt(status, 10) })
      .fetch()
      .catch(function(err){
        reject({ "Error getting status id": err, status: 500 });
      })
      .then(function(status){
        resolve(status.id);
      });
    });
  },

  getAllStatusOptions: function() {
    return new Promise(function(resolve, reject){
      new StatusCollection()
      .fetch({ require: true })
      .catch(function(err){
        reject({ "Error getting all statuses from DB": err, status: 500 });
      })
      .then(function(statusCollection){
        resolve(statusCollection.toJSON({ shallow: true }));
      });
    });
  }

}
