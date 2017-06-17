module.exports = languageLevelRoutes;

function languageLevelRoutes() {

    var languageLevelController = require('./languageLevelController');
    var router = require('express').Router();

    router.route('/')
        .post(languageLevelController.postLanguageLevel)
        .get(languageLevelController.getLanguageLevels);

    router.route('/:languageLevel_id')
        .get(languageLevelController.getLanguageLevel)
        .put(languageLevelController.putLanguageLevel)
        .delete(languageLevelController.deleteLanguageLevel);

    return router;
}