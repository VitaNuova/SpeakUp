var mongoose = require('mongoose');

var Topic = new mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Topic', Topic);