module.exports = eventRoutes;

function eventRoutes() {

    var eventController = require('./eventController');
    var router = require('express').Router();

    router.route('/')
        .post(eventController.postEvent)
        .get(eventController.getEvents);


    router.route('/:event_id')
        .get(eventController.getEvent)
        .put(eventController.putEvent)
        .delete(eventController.deleteEvent);

    router.route('/:event_id/user')
        .get(eventController.joinEvent)

    return router;
}