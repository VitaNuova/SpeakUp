var Event = require('./eventSchema');

exports.postEvent = function(req, res) {
    var event = new Event(req.body);
    event.save(function(err, event) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(event);
    });
};

exports.getEvents = function(req, res) {
    Event.find(function(err, events) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('language').populate('offer').populate('topics')
        .populate('users').exec(function(err, events) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(events);
    });
};

exports.getEvent = function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('language').populate('offer').populate('topics')
        .populate('users').exec(function(err, event) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(event);
    });
};

exports.putEvent = function(req, res) {
     Event.findByIdAndUpdate(
        req.params.event_id,
        req.body,
        {
            new: true,
            runValidators: true
        }, function (err, event) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(event);
        });
};

exports.deleteEvent = function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        event.remove();
        res.sendStatus(200);
    })
};