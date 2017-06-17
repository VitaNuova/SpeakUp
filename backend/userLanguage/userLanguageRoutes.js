module.exports = userLanguageRoutes;

function userLanguageRoutes() {

    var userLanguageController = require('./userLanguageController');
    var router = require('express').Router();

    router.route('/')
        .post(userLanguageController.postUserLanguage)
        .get(userLanguageController.getUserLanguages);


    router.route('/:userLanguage_id')
        .get(userLanguageController.getUserLanguage)
        .put(userLanguageController.putUserLanguage)
        .delete(userLanguageController.deleteUserLanguage);

    return router;
}