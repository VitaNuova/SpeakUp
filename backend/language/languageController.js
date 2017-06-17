var Language = require('./languageSchema');

exports.postLanguage = function(req, res) {
    var language = new Language(req.body);
    language.save(function(err, language) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(language);
    });
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
    Language.findByIdAndUpdate(
        req.params.language_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, language) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(language);
        });
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