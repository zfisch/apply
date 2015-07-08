var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Job app!');
});

var db = require('./server/db.js');

app.listen(3000);