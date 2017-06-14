var mongoose = require('mongoose');

var Restaurant = new mongoose.Schema({
    name: String,
    location: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
});

module.exports = mongoose.model('Restaurant', Restaurant);