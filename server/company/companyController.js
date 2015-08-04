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

  getCompanyId: function(requestBody) {
    return new Promise(function(resolve, reject){
      var company = new Company({ "companyName": requestBody.companyName })
      company.fetch()
      .then(function(existingCompany) {
        if (!existingCompany) {
          company.save()
          .catch(function(err){
            reject({ "Error saving new company": err, status: 500 });
          })
          .then(function(newCompany) {
            resolve(newCompany.id);
          })
        } else {
          resolve(existingCompany.id);
        }
      });
    });
  }

}