var mongoose = require('mongoose');

var UserLanguage = new mongoose.Schema({
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
    languageLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'LanguageLevel' },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

module.exports = mongoose.model('UserLanguage', UserLanguage);