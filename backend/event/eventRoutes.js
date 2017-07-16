module.exports = eventRoutes;

function eventRoutes(passport) {

    var eventController = require('./eventController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['OPTIONS']}));

    router.route('/')
        .post(eventController.postEvent)
        .get(eventController.getEvents);


    router.route('/:event_id')
        .get(eventController.getEvent)
        .put(eventController.putEvent)
        .delete(eventController.deleteEvent);

    router.route('/:event_id/user')
        .get(eventController.joinEvent);

    router.route('/user/:user_id')
        .get(eventController.getEventsByUser);

    return router;
}
