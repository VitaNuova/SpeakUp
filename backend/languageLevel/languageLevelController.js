var LanguageLevel = require('./languageLevelSchema');

exports.postLanguageLevel = function(req, res) {

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