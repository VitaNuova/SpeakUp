var mongoose = require('mongoose');

var Event = new mongoose.Schema({
    title: String,
    venue: String,
    language: String,
    level: String,
    numPeopleCurrent: Number,
    numPeopleRequired: Number,
    time: Date
});

module.exports = mongoose.model('Event', Event);