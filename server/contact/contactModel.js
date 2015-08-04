var db = require('../db');
var Application = require('../application/applicationModel');
var Company = require('../company/companyModel');

var Contact = db.Model.extend({
  tableName: 'contact',

  company: function(){
    return this.belongsTo(Company);
  },

  application: function() {
    return this.belongsTo(Application).through(Company);
  }

});

module.exports = Contact;
