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

  createContact: function(requestBody, companyId) {
    return new Promise(function(resolve, reject){
      var newContact = new Contact({
        "companyId": companyId,
        "contactName": requestBody.contactName,
        "contactEmail": requestBody.contactEmail,
        "contactPhone": requestBody.contactPhone
      })
      newContact.fetch()
      .catch(function(err){
        reject({ "Error fetching contact: ": err, status: 500 });
      })
      .then(function(existingContact){
        if(!existingContact){
          newContact.save()
          .catch(function(err){
            reject({ "Error creating new contact: ": err, status: 500 });
          }).then(function(newContact){
            resolve(newContact);
          });
        } else {
          resolve(existingContact);
        }
      });
    });
  }

}