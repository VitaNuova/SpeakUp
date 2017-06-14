var Restaurant = require('./restaurantSchema');

exports.postRestaurant = function(req, res) {
    var restaurant = new Restaurant(req.body);
    if (!req.user.equals(restaurant.user)) {
        res.sendStatus(401);
    }
    restaurant.save(function(err, restaurant) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(restaurant);
    });
};

exports.getRestaurants = function(req, res) {
    Restaurant.find(function(err, restaurants) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(restaurants);
    });
};

exports.getRestaurants = function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(restaurant);
    });
};

exports.putRestaurant = function(req, res) {
    // Use the Movie model to find a specific movie and update it
    Restaurant.findByIdAndUpdate(
        req.params.restaurant_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, restaurant) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(restaurant);
        });
};

exports.deleteRestaurant = function(req, res) {
    Location.findById(req.params.restaurant_id, function(err, restaurant) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        restaurant.remove();
        res.sendStatus(200);
    })
};
