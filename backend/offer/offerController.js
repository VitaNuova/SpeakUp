var Offer = require('./offerSchema');
var fs = require('fs');
var config = require('../config/config');

exports.postOffer = function(req, res) {
    var offer = new Offer(req.body);
    offer.save(function(err, offer) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(offer);
    });
};

exports.getOffers = function(req, res) {
    Offer.find(function(err, offers) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('restaurant').exec(function(err, offers) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(offers);
    });
};

exports.getOffer = function(req, res) {
    Offer.findById(req.params.offer_id, function(err, offer) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('restaurant').exec(function(err, offers) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(offers);
    });
};

exports.putOffer = function(req, res) {
    Offer.findByIdAndUpdate(
        req.params.offer_id,
        req.body, {
            new: true,
            runValidators: true
        },
        function(err, offer) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(offer);
        });
};

exports.deleteOffer = function(req, res) {
    Offer.findById(req.params.offer_id, function(err, offer) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        offer.remove();
        res.sendStatus(200);
    })
};


exports.uploadImage = function (req, res) {
    var imagePath = 'public/assets/pictures/events/' + req.params.offer_id + '.jpg';
    addToAssets(imagePath, req.body.image);
    Offer.findById(req.params.offer_id, function(err, offer) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        var apiImagePath = config.app.apiUrl + 'assets/pictures/events/' + req.params.offer_id + '.jpg';
        offer.imagePath = apiImagePath;
        Offer.findByIdAndUpdate(
            req.params.offer_id,
            offer,
            {
                new: true,
                runValidators: true
            }, function (err, event) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(201).json(offer);
            });
    })
};

function addToAssets(imagePath, base64Image) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64Image, 'base64');
    // write buffer to file
    fs.writeFileSync(imagePath, bitmap);
    console.log('******** Image for offer created from base64 encoded string ********');
}
