module.exports = offerRoutes;

function offerRoutes() {

    var offerController = require('./offerController');
    var router = require('express').Router();

    router.route('/')
        .post(offerController.postOffer)
        .get(offerController.getOffers);

    router.route('/:offer_id')
        .get(offerController.getOffer)
        .put(offerController.putOffer)
        .delete(offerController.deleteOffer);

    return router;
}