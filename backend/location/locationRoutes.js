module.exports = locationRoutes;

function locationRoutes(passport) {

    var locationController = require('./locationController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['OPTIONS']}));

    router.route('/')
        .post(locationController.postLocation)
        .get(locationController.getLocations);

    router.route('/:location_id')
        .get(locationController.getLocation)
        .put(locationController.putLocation)
        .delete(locationController.deleteLocation);

    return router;
}