module.exports = eventRoutes;

function eventRoutes() {

    var eventController = require('./eventController');
    var router = require('express').Router();

    router.route('/')
        .post(eventController.postEvent)
        .get(eventController.getEvents);

    router.route('/api/events')
        .get(eventController.getEvents);

    router.route('/:event_id')
        .get(eventController.getEvent)
        .put(eventController.putEvent)
        .delete(eventController.deleteEvent);

    return router;
}