var mongoose = require('mongoose');

var LanguageLevel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LanguageLevel', LanguageLevel);