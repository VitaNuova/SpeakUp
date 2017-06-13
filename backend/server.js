var config = require('./config/config');
var app = require('./app');

/**
 * Start the server
 */
app.listen(config.app.port, function() {
    console.log('App listening on port 3000!');
});