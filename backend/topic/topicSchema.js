var mongoose = require('mongoose');

var Topic = new mongoose.Schema({
    name: String,
    imagePath: String
});

module.exports = mongoose.model('Topic', Topic);