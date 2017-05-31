'use strict';

var config = {};
config.app = {};
config.app.port = 3000;
config.db = {};
config.db.host = 'localhost:27017';
config.db.name = 'speakupdb';
config.db.user = 'admin';
config.db.pass = 'admin';

module.exports = config;
