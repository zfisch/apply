var db = require('../db');
var Application = require('../application/applicationModel');

var Status = db.Model.extend({
  tableName: 'status',
  application: function(){
    return this.belongsTo(Application);
  },
});

module.exports = Status;
