var Promise = require('bluebird');
var Application = require('./applicationModel');

module.exports = {

  createApplication: function(req){
    return new Promise(function(resolve, reject){
      new Application({
        "statusId": parseInt(req.body.statusId, 10),
        "applicantId": req.session.user.id
      })
      .save()
      .catch(function(err) {
        reject({ "Error creating new application": err, status: 500 });
      })
      .then(function(newApplication) {
        resolve(newApplication);
      });
    });
  },

  updateApplication: function(application){
    return new Promise(function(resolve, reject){
      application.save()
      .catch(function(err){
        reject({ "Error saving application updates": err, status: 500 });
      })
      .then(function(updatedApplication){
        resolve(updatedApplication);
      });
    });
  }

}
