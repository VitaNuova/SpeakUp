var mongoose = require('mongoose');

var Language = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imagePath: String,
});

module.exports = mongoose.model('Language', Language);