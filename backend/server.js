var config = require('./config/config');
var app = require('./app');

app.listen(config.app.port, function() {
    console.log('App listening on port 3000!');
});

app.get('/', function(req, res) {
    res.send('Hello world!');
});

