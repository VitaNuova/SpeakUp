var Location = require('./locationSchema');

exports.postLocation = function(req, res) {
    var location = new Location(req.body);
    if (!req.user.equals(location.user)) {
        res.sendStatus(401);
    }
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
        if(err) {
           res.status(500).send(err);
           return;
        }
        res.json(locations);
     });
};

exports.getLocation = function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(location);
    });
};

exports.putLocation = function(req, res) {
    // Use the Movie model to find a specific movie and update it
    Location.findByIdAndUpdate(
        req.params.location_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, location) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(location);
        });
};

exports.deleteLocation = function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        location.remove();
        res.sendStatus(200);
    })
};
