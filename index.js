var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Job app!');
});

app.listen(3000);