var db = require('../db');
var Status = require('./statusModel.js');

var StatusCollection = db.Collection.extend({
  model: Status,
});

module.exports = StatusCollection;
