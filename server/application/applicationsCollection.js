var db = require('../db');
var Application = require('./applicationModel.js');

var Applications = db.Collection.extend({
  model: Application
});

module.exports = Applications;
