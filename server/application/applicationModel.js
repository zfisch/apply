var db = require('../db');
var Note = require('../note/noteModel');
var Company = require('../company/companyModel');
var Contact = require('../contact/contactModel');
var Status = require('../status/statusModel');
var Job = require('../job/jobModel');
var User = require('../user/userModel');

var Application = db.Model.extend({
  tableName: 'application',

  hasTimestamps: ["createdAt", "updatedAt"],

  notes: function() {
    return this.hasMany(Note);
  },

  company: function() {
    return this.hasOne(Company);
  },

  contact: function() {
    return this.hasOne(Contact).through(Company);
  },

  status: function() {
    return this.hasOne(Status);
  },

  job: function() {
    return this.hasOne(Job);
  },

  user: function() {
    return this.belongsTo(User);
  }

});

module.exports = Application;
