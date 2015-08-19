var Promise = require('bluebird');
var Job = require('../job/jobModel');

module.exports = {

  createJob: function(title, location, url) {
    return new Promise(function(resolve, reject){
      var newJob = new Job({
        "jobTitle": title,
        "jobLocation": location,
        "jobPosting": url
      });
      newJob.fetch()
      .catch(function(err){
        reject({ "Error fetching job": err, status: 500 });
      })
      .then(function(existingJob){
        if(!existingJob){
          newJob.save()
          .catch(function(err){
            reject({ "Error saving new job": err, status: 500 });
          })
          .then(function(newJob){
            resolve(newJob);
          });
        } else {
          resolve(existingJob);
        }
      });
    });
  }

}
