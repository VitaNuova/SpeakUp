var Offer = require('./offerSchema');

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