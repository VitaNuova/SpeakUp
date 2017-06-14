var Offer = require('./offerSchema');

exports.postOffer = function(req, res) {
    var offer = new Offer(req.body);
    if (!req.user.equals(offer.user)) {
        res.sendStatus(401);
    }
    location.save(function(err, offer) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(offer);
    });
};

exports.getOffers = function(req, res) {
    Offer.find(function(err, offers) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(offers);
    });
};

exports.getOffer = function(req, res) {
    Offer.findById(req.params.offer_id, function(err, offer) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(offer);
    });
};

exports.putOffer = function(req, res) {
    // Use the Movie model to find a specific movie and update it
    Offer.findByIdAndUpdate(
        req.params.offer_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, offer) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(offer);
        });
};

exports.deleteOffer = function(req, res) {
    Offer.findById(req.params.offer_id, function(err, offer) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        offer.remove();
        res.sendStatus(200);
    })
};
