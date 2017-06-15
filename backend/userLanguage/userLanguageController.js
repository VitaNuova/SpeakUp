var UserLanguage = require('./userLanguageSchema');

exports.postUserLanguage = function(req, res) {
    var userLanguage = new UserLanguage(req.body);
    if (!req.user.equals(userLanguage.user)) {
        res.sendStatus(401);
    }
    userLanguage.save(function(err, userLanguage) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(userLanguage);
    });
};

exports.getUserLanguages = function(req, res) {
    UserLanguage.find(function(err, userLanguages) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json(userLanguages);
    });
};

exports.getUserLanguage = function(req, res) {
    UserLanguage.findById(req.params.userLanguage_id, function(err, userLanguage) {
       if(err) {
           res.status(500).send(err);
           return;
       }
       res.json(userLanguage);
    });
};

exports.putUserLanguage = function(req, res) {
    UserLanguage.findByIdAndUpdate(
        req.params.userLanguage_id,
        req.body,
        {
           new: true,
           runValidators: true
        }, function (err, userLanguage) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(userLanguage);
        });
};

exports.deleteUserLanguage = function(req, res) {
    UserLanguage.findById(req.params.userLanguage_id, function(err, userLanguage) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        userLanguage.remove();
        res.sendStatus(200);
    })
};

