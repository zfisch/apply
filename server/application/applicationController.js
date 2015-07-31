var Promise = require('bluebird');
var http = require('http');
var Application = require('./applicationModel');
var db = require('../db');
var utils = require('../config/utility');


module.exports = {

  saveApplication: function(application){
    console.log(application.body);
    //TODO: allow user to have multiple applications for different jobs at same company.
    return new Promise(function(resolve, reject){
      new Application({ 'companyName': application.companyName }).fetch().then(function(found){
        if(!found){
          var newApplication = new Application({
            'companyName': application.companyName,
            'jobTitle': application.jobTitle,
            'status': application.status,
            'notes': application.notes,
          }).save({}, {method: 'insert'})
          .then(function(){
            resolve()
          })
          .catch(function(error) {
            console.log("error custom log", error);
            reject({'error': error});
          });
        } else {
          resolve()
        }
      });
    });
  }

};
