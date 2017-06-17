var mongoose = require('mongoose');

var Topic = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Topic', Topic);