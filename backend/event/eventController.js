var Event = require('./eventSchema');

exports.postEvent = function(req, res) {};

exports.getEvents = function(req, res) {
    Event.find(function(err, events) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(events);
    });
};

exports.getEvent = function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
       if(err) {
           res.status(500).send(err);
           return;
       }
       res.json(event);
    });
};

exports.putEvent = function(req, res) {

};

exports.deleteEvent = function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        event.remove();
        res.sendStatus(200);
    })
};

