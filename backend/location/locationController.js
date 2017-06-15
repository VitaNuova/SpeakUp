var Location = require('./locationSchema');

exports.postLocation = function(req, res) {
    var location = new Location(req.body);
    location.save(function(err, location) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(location);
    });
};

exports.getLocations = function(req, res) {
    Location.find(function(err, locations) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(locations);
    });
};

exports.getLocation = function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(location);
    });
};

exports.putLocation = function(req, res) {
    Location.findByIdAndUpdate(
        req.params.location_id,
        req.body, {
            new: true,
            runValidators: true
        },
        function(err, location) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(location);
        });
};

exports.deleteLocation = function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        location.remove();
        res.sendStatus(200);
    })
};