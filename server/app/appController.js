var Promise = require('bluebird');
var userController = require('../user/userController');
var applicationController = require('../application/applicationController');
var companyController = require('../company/companyController');
var jobController = require('../job/jobController');
var statusController = require('../status/statusController');
var noteController = require('../note/noteController');
var contactController = require('../contact/contactController');

module.exports = {

  login: function(req, res){
    userController.login(req.body.email, req.body.password)
    .then(function(user){
      req.session.userId = user.id;
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'login error': error });
    })
  },

  signup: function(req, res){
    userController.signup(req.body.email, req.body.password)
    .then(function(user){
      req.session.userId = user.id;
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'signup error': error });
    })
  },

  //Creating a new application require saving all of the relevant normalized data to the DB.
  //In this case, all of that information gets sent in a single Application model, and is
  //handled by the server and stored in the correct tables.
  createNewApplication: function(req, res){
    applicationController.createApplication(req)
    .catch(function(error){
      res.status(error.status || 500).send(error);
    })
    .then(function(newApplication){

      //Get the correct company id for the application, and apply the application id to a new note.
      companyController.getCompanyId(req.body)
      .catch(function(error){
        res.status(error.status || 500).send(error);
      })
      .then(function(companyId){

        //Create a new contact for the application if necessarry
        if(req.body.contactName || !req.body.contactEmail || req.body.contactPhone){
          contactController.createContact(req.body, companyId)
          .catch(function(error){
            res.status(error.status || 500).send(error);
          });
        }

        //Set the company ID on the application.
        newApplication.set({ companyId: companyId });
      });

      //Create a new note with the correct application Id
      if(req.body.note){
        noteController.createNote(req.body.note, newApplication.id)
        .catch(function(error){
          res.status(error.status || 500).send(error);
        });
      }

      //Create a job and bind it to the application
      jobController.createJob(req.body.jobTitle, req.body.jobLocation, req.body.jobPosting)
      .catch(function(error){
        res.status(error.status || 500).send(error);
      })
      .then(function(newJob){

        //Set the job ID on the application.
        newApplication.set({ jobId: newJob.id });

        //Update the application.
        applicationController.updateApplication(newApplication)
        .catch(function(error){
          res.status(error.status || 500).send(error);
        })
        .then(function(updatedApplication){
          res.status(200).send(updatedApplication);
        });
      });

    });
  }

}
