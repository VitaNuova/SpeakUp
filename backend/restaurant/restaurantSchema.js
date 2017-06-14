var mongoose = require('mongoose');

var Restaurant = new mongoose.Schema({
    name: String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
});

module.exports = mongoose.model('Restaurant', Restaurant);