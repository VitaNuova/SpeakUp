var mongoose = require('mongoose');

var Offer = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    numOfPeople: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Offer', Offer);