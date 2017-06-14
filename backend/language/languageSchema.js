var mongoose = require('mongoose');

var Language = new mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Language', Language);