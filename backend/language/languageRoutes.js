module.exports = languageRoutes;

function languageRoutes(passport) {

    var languageController = require('./languageController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['OPTIONS']}));

    router.route('/')
        .post(languageController.postLanguage)
        .get(languageController.getLanguages);

    router.route('/:language_id')
        .get(languageController.getLanguage)
        .put(languageController.putLanguage)
        .delete(languageController.deleteLanguage);

    return router;
}