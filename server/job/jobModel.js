var db = require('../db');
var Application = require('../application/applicationModel');

var Job = db.Model.extend({
  tableName: 'job',

  application: function(){
    return this.belongsTo(Application);
  }

});

module.exports = Job;
