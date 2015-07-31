var db = require('../db');

var Application = db.Model.extend({
  tableName: 'application',
  notes: function(){
    return this.hasMany(Note);
  },
});

module.exports = Application;
