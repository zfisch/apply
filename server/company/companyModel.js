var db = require('../db');
var Application = require('../application/applicationModel');
var Contact = require('../contact/contactModel');

var Company = db.Model.extend({
  tableName: 'company',

  application: function() {
    return this.belongsTo(Application);
  },

  contact: function() {
    return this.hasOne(Contact)
  }

});

module.exports = Company;
