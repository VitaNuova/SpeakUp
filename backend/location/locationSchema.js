var mongoose = require('mongoose');

var Location = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Location', Location);