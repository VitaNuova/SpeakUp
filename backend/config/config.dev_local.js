'use strict';

var config = {};
config.app = {};
config.db = {};
config.db = {};
config.db.host = 'localhost:27017';
config.db.name = 'speakupdb';
config.app.port = 3000;
config.auth = {};
config.auth.jwtSecret = "secret";


module.exports = config;