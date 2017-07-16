module.exports = restaurantRoutes;

function restaurantRoutes(passport) {

    var restaurantController = require('./restaurantController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['OPTIONS']}));

    router.route('/')
        .post(restaurantController.postRestaurant)
        .get(restaurantController.getRestaurants);

    router.route('/:restaurant_id')
        .get(restaurantController.getRestaurant)
        .put(restaurantController.putRestaurant)
        .delete(restaurantController.deleteRestaurant);

    return router;
}