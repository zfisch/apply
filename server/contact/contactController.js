var Promise = require('bluebird');
var Contact = require('../contact/contactModel');

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