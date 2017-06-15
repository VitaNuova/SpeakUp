var mongoose = require('mongoose');
var Restaurant = require('./restaurantSchema');

exports.postRestaurant = function(req, res) {
    var restaurant = new Restaurant(req.body);
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
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('location').exec(function(err, restaurants) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(restaurants);
    });
};

exports.getRestaurant = function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('location').exec(function(err, restaurant) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(restaurant);
    });
};

exports.putRestaurant = function(req, res) {
    Restaurant.findByIdAndUpdate(
        req.params.restaurant_id,
        req.body, {
            new: true,
            runValidators: true
        },
        function(err, restaurant) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(restaurant);
        });
};

exports.deleteRestaurant = function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        restaurant.remove();
        res.sendStatus(200);
    });
};