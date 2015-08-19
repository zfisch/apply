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
      //Store userID on the session for later reference.
      req.session.user = user;
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'login error': error });
    })
  },

  signup: function(req, res){
    userController.signup(req.body.email, req.body.password)
    .then(function(user){
      //Store userID on the session for later reference.
      req.session.user = user;
      res.status(200).send(user);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'signup error': error });
    })
  },

  logout: function(req, res){
    userController.logout(req)
    .then(function(){
      res.sendStatus(200);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'Logout error': error });
    });
  },

  getUserApplications: function(req, res){
    applicationController.getApplications(req)
    .then(function(applications){
      res.status(200).send(applications);
    })
    .catch(function(error){
      res.status(error.status || 500).send({ 'Get applications error': error});
    });
  },

  /*
  CREATING AN APPLICATION:
  Because the DB is normalized, saving an application requires some maneuvering to get all of the
  correct information in the correct tables. All application information is sent in a single request
  through an Application Model from the client, including information about the User, Status, Company,
  Contact, Notes, and Job.
  */

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
        if(req.body.contactName || req.body.contactEmail || req.body.contactPhone){
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
