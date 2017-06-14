var config = require('./config/config');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

/*mongoose.connect([config.db.host, '/', config.db.name].join(''), {
    user: config.db.user,
    pass: config.db.pass
});*/

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
jwtConfig(passport);

var userRoutes = require("./user/userRoutes");
var eventRoutes = require("./event/eventRoutes");
app.use('/api/events', eventRoutes(passport));
app.use('/api/user', userRoutes(passport));

module.exports = app;