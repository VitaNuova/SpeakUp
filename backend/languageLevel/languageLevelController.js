var LanguageLevel = require('./languageLevelSchema');

exports.postLanguageLevel = function(req, res) {
    var languageLevel = new LanguageLevel(req.body);
    languageLevel.save(function(err, languageLevel) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(languageLevel);
    });
};

exports.getLanguageLevels = function(req, res) {
    LanguageLevel.find(function(err, languageLevels) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(languageLevels);
    });
};

exports.getLanguageLevel = function(req, res) {
    LanguageLevel.findById(req.params.languageLevel_id, function(err, languageLevel) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(languageLevel);
    });
};

exports.putLanguageLevel = function(req, res) {
    LanguageLevel.findByIdAndUpdate(
        req.params.languageLevel_id,
        req.body,
        {
            new: true,
            runValidators: true
        }, function (err, languageLevel) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(languageLevel);
        });
};

exports.deleteLanguageLevel = function(req, res) {
    LanguageLevel.findById(req.params.languageLevel_id, function(err, languageLevel) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        languageLevel.remove();
        res.sendStatus(200);
    })
};