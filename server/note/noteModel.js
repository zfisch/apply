var db = require('../db');
var Application = require('../application/applicationModel');

var Note = db.Model.extend({
  tableName: 'note',

  application: function(){
    return this.belongsTo(Application);
  }

});

module.exports = Note;
