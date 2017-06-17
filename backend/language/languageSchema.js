var mongoose = require('mongoose');

var Language = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Language', Language);