var Language = require('./languageSchema');

exports.postLanguage = function(req, res) {

};

exports.getLanguages = function(req, res) {
    Language.find(function(err, languages) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(languages);
    });
};

exports.getLanguage = function(req, res) {
    Language.findById(req.params.language_id, function(err, language) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(language);
    });
};

exports.putLanguage = function(req, res) {

};

exports.deleteLanguage = function(req, res) {
    Language.findById(req.params.language_id, function(err, language) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        language.remove();
        res.sendStatus(200);
    })
};