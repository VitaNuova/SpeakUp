var mongoose = require('mongoose');

var Event = new mongoose.Schema({
    name: String,
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
    imagePath: String,
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Event', Event);