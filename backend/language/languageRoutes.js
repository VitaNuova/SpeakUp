module.exports = languageRoutes;

function languageRoutes() {

    var languageController = require('./languageController');
    var router = require('express').Router();

    router.route('/')
        .post(languageController.postLanguage)
        .get(languageController.getLanguages);

    router.route('/api/languages')
        .get(languageController.getLanguages);

    router.route('/:language_id')
        .get(languageController.getLanguage)
        .put(languageController.putLanguage)
        .delete(languageController.deleteLanguage);

    return router;
}