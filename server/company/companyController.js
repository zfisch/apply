var Promise = require('bluebird');
var db = require('../db');
var Company = require('../company/companyModel');

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