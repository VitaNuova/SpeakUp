module.exports = restaurantRoutes;

function restaurantRoutes() {

    var restaurantController = require('./restaurantController');
    var router = require('express').Router();

    router.route('/')
        .post(restaurantController.postRestaurant)
        .get(restaurantController.getRestaurants);

    router.route('/:restaurant_id')
        .get(restaurantController.getRestaurant)
        .put(restaurantController.putRestaurant)
        .delete(restaurantController.deleteRestaurant);

    return router;
}