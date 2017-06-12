var config = require('./config/config');
var mongoose = require('mongoose');
var path = require('path');

/*mongoose.connect([config.db.host, '/', config.db.name].join(''), {
    user: config.db.user,
    pass: config.db.pass
});*/

var express = require('express');
var app = express();

app.listen(config.app.port, function() {
  console.log('App listening on port 3000!');
});

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/../frontend/src/index.html'));
});

module.exports = app;