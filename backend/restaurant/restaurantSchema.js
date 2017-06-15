var mongoose = require('mongoose');
var location = require('../location/locationSchema')

var Restaurant = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Location',
                required: true
    }
});

module.exports = mongoose.model('Restaurant', Restaurant);