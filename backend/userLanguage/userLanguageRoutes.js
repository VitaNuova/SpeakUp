module.exports = userLanguageRoutes;

function userLanguageRoutes(passport) {

    var userLanguageController = require('./userLanguageController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['POST', 'OPTIONS']}));

    router.route('/')
        .post(userLanguageController.postUserLanguage)
        .get(userLanguageController.getUserLanguages);


    router.route('/:userLanguage_id')
        .get(userLanguageController.getUserLanguage)
        .put(userLanguageController.putUserLanguage)
        .delete(userLanguageController.deleteUserLanguage);

    return router;
}