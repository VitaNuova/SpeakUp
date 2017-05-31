var config = require('./config/config');
var mongoose = require('mongoose');

mongoose.connect([config.db.host, '/', config.db.name].join(''), {
    user: config.db.user,
    pass: config.db.pass
});

var express = require('express');
var app = express();

module.exports = app;