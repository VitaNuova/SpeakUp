module.exports = topicRoutes;

function topicRoutes(passport) {

    var topicController = require('./topicController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['OPTIONS']}));

    router.route('/')
        .post(topicController.postTopic)
        .get(topicController.getTopics);

    router.route('/:topic_id')
        .get(topicController.getTopic)
        .put(topicController.putTopic)
        .delete(topicController.deleteTopic);

    return router;
}