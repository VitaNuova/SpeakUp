var mongoose = require('mongoose');

var LanguageLevel = new mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('LanguageLevel', LanguageLevel);