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

module.exports = {

  createNote: function(note, applicationId) {
    return new Promise(function(resolve, reject){
      new Note({
        "applicationId": applicationId,
        "note": note
      })
      .save()
      .catch(function(err){
        reject({ "Error saving new note": err, status: 500 });
      })
      .then(function(newNote){
        resolve(newNote);
      });
    });
  },

}