var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

var db = require('./server/db.js');

app.listen(3000);
