module.exports = topicRoutes;

function topicRoutes() {

    var topicController = require('./topicController');
    var router = require('express').Router();

    router.route('/')
        .post(topicController.postTopic)
        .get(topicController.getTopics);

    router.route('/:topic_id')
        .get(topicController.getTopic)
        .put(topicController.putTopic)
        .delete(topicController.deleteTopic);

    return router;
}