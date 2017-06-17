var config = require('./config/config');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

var dbURI = 'mongodb://' + config.db.host + "/" + config.db.name;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var app = express();

app.use(morgan('combined'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
jwtConfig(passport);

//Root routes
var eventRoutes = require("./event/eventRoutes");
var languageRoutes = require("./language/languageRoutes");
var userRoutes = require("./user/userRoutes");
var languageLevelRoutes = require("./languageLevel/languageLevelRoutes");
var offerRoutes = require("./offer/offerRoutes");
var restaurantRoutes = require("./restaurant/restaurantRoutes");
var topicRoutes = require("./topic/topicRoutes");
var locationRoutes = require("./location/locationRoutes");
var userLanguageRoutes = require("./userLanguage/userLanguageRoutes");

app.use('/api/events', eventRoutes());
app.use('/api/languages', languageRoutes());
app.use('/api/user', userRoutes());
app.use('/api/language-levels', languageLevelRoutes());
app.use('/api/offers', offerRoutes());
app.use('/api/restaurants', restaurantRoutes());
app.use('/api/topics', topicRoutes());
app.use('/api/locations', locationRoutes());
app.use('/api/user-languages', userLanguageRoutes());

module.exports = app;