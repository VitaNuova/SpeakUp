var Event = require('./eventSchema');
var User = require('../user/userSchema');

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


exports.getEventsByUser = function(req, res) {
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

    var userEvents = [];
      for (event of events ) {
        for (user of event.users) {
          if (req.params.user_id == user._id) {
            userEvents.push(event);
          }
        }
      }

    res.json(userEvents);
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

  exports.joinEvent = function(req, res) {
    var userId = req.query.register;
    // console.log(userId);
    User.findById(userId, function(err, user) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      Event.findById(req.params.event_id, function(err, event) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        event.users.push(user);
        Event.findByIdAndUpdate(
          event._id,
          event, {
            new: true,
            runValidators: true
          }, function (err, event) {
            if (err) {
              res.status(500).send(err);
              return;
            }
            res.json(user);
          });
        });
      });
    };
