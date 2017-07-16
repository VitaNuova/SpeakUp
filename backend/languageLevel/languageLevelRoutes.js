module.exports = languageLevelRoutes;

function languageLevelRoutes(passport) {

    var languageLevelController = require('./languageLevelController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(languageLevelController.postLanguageLevel)
        .get(languageLevelController.getLanguageLevels);

    router.route('/:languageLevel_id')
        .get(languageLevelController.getLanguageLevel)
        .put(languageLevelController.putLanguageLevel)
        .delete(languageLevelController.deleteLanguageLevel);

    return router;
}