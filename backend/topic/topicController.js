var Topic = require('./topicSchema');

exports.postTopic = function(req, res) {
    var topic = new Topic(req.body);
    topic.save(function(err, topic) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(topic);
    });
};

exports.getTopics = function(req, res) {
    Topic.find(function(err, topics) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(topics);
    });
};

exports.getTopic = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(topic);
    });
};

exports.putTopic = function(req, res) {
    Topic.findByIdAndUpdate(
        req.params.topic_id,
        req.body,
        {
            new: true,
            runValidators: true
        }, function (err, topic) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(topic);
        });
};

exports.deleteTopic = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        topic.remove();
        res.sendStatus(200);
    })
};