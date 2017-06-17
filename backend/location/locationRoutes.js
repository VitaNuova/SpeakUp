module.exports = locationRoutes;

function locationRoutes() {

    var locationController = require('./locationController');
    var router = require('express').Router();

    router.route('/')
        .post(locationController.postLocation)
        .get(locationController.getLocations);

    router.route('/:location_id')
        .get(locationController.getLocation)
        .put(locationController.putLocation)
        .delete(locationController.deleteLocation);

    return router;
}